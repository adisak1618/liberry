import "reflect-metadata";
require('newrelic');
const http = require("http");
import { middleware } from "@line/bot-sdk";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as express from "express";
import * as bodyParser from "body-parser";
import { config } from "./utils/line_config";
import * as next from "next";
import * as expressValidator from "express-validator";
import * as cookieParser from "cookie-parser";
import * as handleEvent from "./webhook";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { LineUser } from "./entity/LineUser";
import { createTypeormConn } from "./utils/createTypeormConn";
import { Resolvers } from "./modules"

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const dev = !isProduction && process.env.DEVMODE !== "server";
// init next.js app
const nextApp = next({
    dev,
    dir: './app',
});
const handle = nextApp.getRequestHandler();
try {
    const main = async () => {
        // init apollo-server
        const schema = await buildSchema({
            resolvers: Resolvers,
            authChecker: ({ context: { req } }) => {
                const auth = req.headers.authorization;
                if (auth) {
                    const token = auth !== undefined ? auth.split("Bearer ")[1] : ""
                    try {
                        const decode_token = jwt.verify(token, process.env.LoginchannelSecret, {
                            issuer: 'https://access.line.me',
                            audience: process.env.LoginchannelID,
                            algorithms: ['HS256']
                        })
                        return true;
                    } catch (error) {
                        throw Error("not authenticated");
                    }
                }
                throw Error("not authenticated");
            }
        });
        const apolloServer = new ApolloServer({
            schema,
            context: ({ req }) => {
                return ({ req });
            }
        });
        const conn = await createTypeormConn()
        conn.runMigrations();
        await nextApp.prepare()
        const app = express();
        app.set('view engine', 'pug')
        app.use(express.static('public'))
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(expressValidator());
        apolloServer.applyMiddleware({ app });
        // app.use(middleware(config));
        // app.use(bodyParser.json());

        app.get('/callback', (req, res) => {
            res.send('success');
        });

        app.use('/', Routes);

        app.post('/callback', middleware(config), async (req: Request, res: Response) => {
            Promise
                .all(req.body.events.map(handleEvent.default))
                .then((result) => res.json(result))
                .catch((err) => {
                    console.error('err', err);
                    res.status(500).end();
                });
        });
        app.get('*', (req, res) => {
            return handle(req, res);
        });
        app.listen(port);

        console.log(`Express server has started on port ${port}. Open ${process.env.APPBASEURL}:${port} to see results`);
    }
    main();
    setInterval(function () {
        http.get("http://tclibrary.herokuapp.com");
    }, 100000); // every 5 minutes (300000)

} catch (error) {
}

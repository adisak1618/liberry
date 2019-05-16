import "reflect-metadata";
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
// import { genSchema } from "./utils/genSchema";
import { Resolvers } from "./modules"

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const dev = !isProduction;
// init next.js app
const nextApp = next({
    dev,
    dir: './app',
});
const handle = nextApp.getRequestHandler();
// const schema = genSchema() as any;
interface Me {
    name: string,
    age: number
}
// @Resolver()
// class HelloResolver {
//     @Query(() => any)
//     async hello(): Promise<Me> {
//         return {
//             name: "adisak",
//             age: 12
//         };
//     }

//     @Query(() => String, { nullable: true, description: "second resolver" })
//     async hello2() {
//         return "Hello World2!";
//     }
// }

try {
    const main = async () => {
        // init apollo-server
        const schema = await buildSchema({
            resolvers: Resolvers,
            authChecker: ({ context: { req } }) => {
                console.log('req.headers', req.headers.authorization);
                const auth = req.headers.authorization;
                if (auth) {
                    const token = auth !== undefined ? auth.split("Bearer ")[1] : ""
                    try {
                        const decode_token = jwt.verify(token, process.env.LoginchannelSecret, {
                            issuer: 'https://access.line.me',
                            audience: process.env.LoginchannelID,
                            algorithms: ['HS256']
                        })
                        console.log('wtf decode_token', decode_token);
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
                // console.log('adisakcontext', context);
                return ({ req });
            }
        });
        await createTypeormConn().then(async () => {
            // create express app
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
                // console.log('adisakreq', req.cookies, req.headers);
                return handle(req, res);
            });
            app.listen(port);
            // register express routes from defined application routes
            // Routes.forEach(route => {
            //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            //         const result = (new (route.controller as any))[route.action](req, res, next);
            //         if (result instanceof Promise) {
            //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            //         } else if (result !== null && result !== undefined) {
            //             res.json(result);
            //         }
            //     });
            // });

            // setup express app here
            // ...

            // start express server

            // insert new users for test
            // await connection.manager.save(connection.manager.create(User, {
            //     firstName: "Timber",
            //     lastName: "Saw",
            //     age: 27
            // }));
            // await connection.manager.save(connection.manager.create(User, {
            //     firstName: "Phantom",
            //     lastName: "Assassin",
            //     age: 24
            // }));

            console.log(`Express server has started on port ${port}. Open http://localhost:${port} to see results`);
        })
    }
    main();

} catch (error) {
}

import "reflect-metadata";
import { middleware } from "@line/bot-sdk";
import { ApolloServer } from "apollo-server-express";
import { Query, buildSchema, Resolver } from "type-graphql";
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
import { type } from "os";

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
            resolvers: Resolvers
        });
        const apolloServer = new ApolloServer({ schema });
        await createTypeormConn().then(async () => {
            // create express app
            await nextApp.prepare()
            const app = express();
            apolloServer.applyMiddleware({ app });
            app.set('view engine', 'pug')
            app.use(express.static('public'))
            app.use(express.urlencoded({ extended: false }));
            app.use(cookieParser());
            app.use(expressValidator());
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

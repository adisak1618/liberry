import "reflect-metadata";
import { middleware } from "@line/bot-sdk";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { config } from "./utils/line_config";
import * as expressValidator from "express-validator";
import * as cookieParser from "cookie-parser";
import * as handleEvent from "./webhook";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { LineUser } from "./entity/LineUser";
import { createTypeormConn } from "./utils/createTypeormConn";

const port = process.env.PORT || 3000;
try {
    createTypeormConn().then(async () => {
        // create express app
        const app = express();
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
        app.listen(port);

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

} catch (error) {
}

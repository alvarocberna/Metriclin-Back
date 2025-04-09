import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number | string;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number | string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(this.routes)
        this.app.listen(this.port, () => {
            console.log('Server is running');
        });

        console.log('Server started')
    }

}
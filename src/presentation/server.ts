import express, { Router } from 'express';
import path from 'path';
import cors from 'cors';

interface Options {
    port: number | string;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number | string;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.static(this.publicPath));

        this.app.use(this.routes);

        // this.app.get('*', (req, res) => {
        //     const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
        //     res.sendFile(indexPath);
        // });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    }

}
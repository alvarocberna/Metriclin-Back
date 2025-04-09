import { Server } from './presentation/server';
import { AppRoutes } from './presentation/router';
import { envs } from './config/envs';

(async () => {
    main();
})();

function main() {

    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });
    server.start();

    console.log('Ejecutando app.ts');

}
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/router';
import { envs } from './config/envs';

(() => {
    main();
})();

function main() {
    console.log('ejecutando app.ts')
    try {
        const server = new Server({
            port: envs.PORT,
            public_path: envs.PUBLIC_PATH,
            routes: AppRoutes.routes
        });
        server.start();
        console.log('Server creado e iniciado');
    } catch (error) {
        console.error('Error creando server:', error);
    }
}
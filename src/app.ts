import { Server } from './presentation/server';
import { AppRoutes } from './presentation/router';

(() => {
    main();
})();

function main() {
    console.log('ejecutando app.ts')
    try {
        const PORT = process.env.PORT || 3000;
        const server = new Server({
            port: PORT,
            routes: AppRoutes.routes
        });
        server.start();
        console.log('Server creado e iniciado');
    } catch (error) {
        console.error('Error creando server:', error);
    }
}
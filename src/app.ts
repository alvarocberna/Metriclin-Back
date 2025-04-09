import { Server } from './presentation/server';
import { AppRoutes } from './presentation/router';

(() => {
    main();
})();

function main() {
    const PORT = process.env.PORT || 3000;
    const server = new Server({
        port: PORT,
        routes: AppRoutes.routes
    });
    server.start();
}
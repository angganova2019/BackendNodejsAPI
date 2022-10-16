const Hapi = require('@hapi/hapi');
const { migratedb } = require('./migration');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
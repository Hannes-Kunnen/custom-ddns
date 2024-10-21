import type {FastifyBaseLogger} from 'fastify';
import Fastify from 'fastify';

// import configData from '../../../../../config.yaml';

let logger: FastifyBaseLogger | undefined;

export const startServer = async () => {
    let loggerConfig;
    if (process.env.NODE_ENV === 'development') {
        loggerConfig = {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
        };
    } else {
        loggerConfig = {
            formatters: {
                level(label: string, number: number) {
                    return {level: label};
                },
            },
        };
    }

    const fastifyApp = Fastify({
        logger: loggerConfig,
    });
    logger = fastifyApp.log;

    let port = 5100;
    if ('PORT' in process.env && process.env.PORT !== undefined) {
        port = parseInt(process.env.PORT, 10);
        if (isNaN(port)) {
            throw new Error(`Invalid port: ${process.env.PORT}`);
        }
    }

    // const config = parseConfig(configData);

    // Graceful shutdown.
    // const listeners = ['SIGINT', 'SIGTERM'];
    // listeners.forEach((signal) => {
    //     // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //     process.on(signal, async () => {
    //         fastifyApp.log.info({
    //             msg: 'Closing server...',
    //             signal: signal,
    //         });
    //         await fastifyApp.close();
    //         process.exit(0);
    //     });
    // });

    fastifyApp.setNotFoundHandler(async (request, reply) => {
        request.log.info(`Route ${request.method}:${request.url} not found`);
        await reply.status(404).send('Not found');
    });

    interface UpdateIpQuery {
        hosts?: string;
        ip?: string;
        tags?: string;
    }

    // Update IP route.
    fastifyApp.route<{
        Querystring: UpdateIpQuery;
    }>({
        method: 'GET',
        url: '/update-ip',
        schema: {
            querystring: {
                title: 'Querystring schema',
                type: 'object',
                properties: {
                    ip: {
                        type: 'string',
                    },
                    hosts: {
                        type: 'string',
                    },
                    tags: {
                        type: 'string',
                    },
                },
            },
            response: {
                '2xx': {
                    type: 'string',
                },
                '3xx': {
                    type: 'string',
                },
                '4xx': {
                    type: 'string',
                },
            },
        },

        handler: async (request, reply) => {
            if (request.query.ip === undefined) {
                await reply.status(422).send('ip query parameter absent');
            }

            const authorization = request.headers.authorization;
            if (authorization === undefined) {
                await reply
                    .status(401)
                    .header('WWW-authenticate', 'Basic')
                    .send('Request must bear Authorization header with Basic auth');
            }

            try {
                // const validated = validateRequestParams({
                //     ip: request.query.ip!,
                //     hosts: request.query.hosts,
                //     tags: request.query.tags,
                // });
                // console.log(`validated:`, validated);
                //
                // await updateIp({
                //     config: config,
                //     env: process.env,
                //     ip: validated.ip,
                //     ipVersion: validated.ipVersion,
                //     providedPassword: getUsernameAndPasswordFromBasicAuth(authorization!).password,
                //     requestHosts: validated.hosts,
                //     tags: validated.tags,
                // });
                await reply.status(200).send('OK');
            } catch (error) {
                // if (error instanceof CustomError) {
                //     request.log.error(error);
                //     await reply
                //         .status(error.status ?? 500)
                //         .headers({
                //             'Content-Type': 'text/plain',
                //             ...error.responseHeaders,
                //         })
                //         .send(error.message);
                // }

                request.log.error(error);
                await reply.status(500).send('Failure');
            }
        },
    });

    // Run the server!
    await fastifyApp.listen({port: port});
};

startServer().catch((error: Error) => {
    if (logger === undefined) {
        console.error('Error during startup', error);
    } else {
        logger.fatal({
            msg: error.message,
            err: error,
        });
    }
});


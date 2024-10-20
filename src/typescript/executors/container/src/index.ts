import {parseConfig} from 'ddns-base';
import Fastify, {FastifyBaseLogger} from 'fastify';
import BasicAuth from '@fastify/basic-auth'
import * as fs from 'node:fs';

import configData from '../../../../../config.yaml';

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
            redact: {
                paths: ['req.headers.authorization'],
            },
            // transport: {
            //     options: {
            //         useLevelLabels: true,
            //     }
            // }
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
            fastifyApp.log.fatal({
                msg: 'Invalid port',
                port: process.env.PORT,
            });
        }
    }

    const config = parseConfig(configData)

    // Graceful shutdown.
    const listeners = ['SIGINT', 'SIGTERM'];
    listeners.forEach((signal) => {
        process.on(signal, async () => {
            fastifyApp.log.info({
                msg: 'Closing server...',
                signal: signal,
            });
            await fastifyApp.close();
            process.exit(0);
        });
    });

    fastifyApp.register(BasicAuth, {
        validate: async (username, password, req, res) => {
        }
    })

    // Declare a route
    fastifyApp.get('/', function(request, reply) {
        reply.send({hello: 'world'});
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
            error,
        });
    }
});





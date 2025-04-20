// make the logs look pretty

const pino = require('pino')

const transport = pino.transport({
    targets: [
        {
            level: 'trace',
            target: 'pino/file',
            options: {
                destination: `logs/${Date.now()}.json`, // using unix time to keep track of logs... not sure :/ 
                mkdir: true
            },
        },
        {
            level: 'trace',
            target: 'pino-pretty',
            options: {
                colorize: true
            },
        },
    ],
});

const logger = pino(transport);

module.exports = { logger };

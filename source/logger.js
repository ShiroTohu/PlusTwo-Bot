// make the logs look pretty

const pino = require('pino')

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

// const logger = pino()

module.exports = { logger };

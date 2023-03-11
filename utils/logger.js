const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'info',
            db: process.env.DB_LOCAL,
            options: { useUnifiedTopology: true },
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger
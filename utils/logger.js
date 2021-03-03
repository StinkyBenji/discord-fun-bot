const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, errors, colorize } = format;

const logFormat = printf((info) => {
  const { timestamp, level, label, message, ...rest } = info;
  let log = `${timestamp} [${label}] ${level}: ${message}`;

  if (!(Object.keys(rest).length === 0 && rest.constructor === Object)) {
    log = `${log}\n${JSON.stringify(rest, null, 2)}`.replace(/\\n/g, '\n');
  }

  return log;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    errors({stack: true}),
    label({label: path.basename(process.mainModule.filename)}),
    timestamp()
  ),
  transports: [
    new transports.Console({format: combine(colorize(), logFormat)}),
    new transports.File({ filename: path.join(__basedir, 'logs/error.log'), level: 'error', format: logFormat }),
    new transports.File({ filename: path.join(__basedir, 'logs/combined.log'), level:'info', format: logFormat }),
  ],
});

module.exports = logger;
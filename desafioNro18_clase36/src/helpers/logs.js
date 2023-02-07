import log4js from 'log4js';

log4js.configure({
  appenders: {
    fileError: { type: 'file', filename: './logs/error.log' },
    consola: { type: 'console' },
  },
  categories: {
    default: { appenders: ['consola'], level: 'info' },
    loggerError: { appenders: ['fileError', 'consola'], level: 'error' },
  },
});

export const logger = log4js.getLogger();
export const loggerError = log4js.getLogger('loggerError');
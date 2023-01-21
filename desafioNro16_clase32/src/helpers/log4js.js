import log4js from 'log4js';

log4js.configure({
  appenders: {
    fileWarn: { type: 'file', filename: './logs/warn.log' },
    fileError: { type: 'file', filename: './logs/error.log' },
    consola: { type: 'console' },
  },
  categories: {
    default: { appenders: ['consola'], level: 'info' },
    loggerError: { appenders: ['fileError', 'consola'], level: 'error' },
    loggerWarn: { appenders: ['fileWarn', 'consola'], level: 'warn' },
  },
});

export const logger = log4js.getLogger();
export const loggerWarn = log4js.getLogger('loggerWarn');
export const loggerError = log4js.getLogger('loggerError');


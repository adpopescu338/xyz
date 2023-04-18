import pino from 'pino';
import expressPino from 'express-pino-logger';

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
  },
});
const expressLogger = expressPino({ logger });

export function loggerMiddleware(...args) {
  if (
    process.env.VERCEL_ENV !== `production` &&
    process.env.LOG_LEVEL === 'debug' &&
    process.env.LOG_API_CALLS === 'true'
  ) {
    return expressLogger(...args);
  }
  const next = args[2];
  next();
}

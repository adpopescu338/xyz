import pino from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
  },
});

export function loggerMiddleware(...args) {
  if (
    process.env.VERCEL_ENV !== `production` &&
    process.env.LOG_LEVEL === 'debug' &&
    process.env.LOG_API_CALLS === 'true'
  ) {
    console.log(...args)
  }
  const next = args[2];
  next();
}

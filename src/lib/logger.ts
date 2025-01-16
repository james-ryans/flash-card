import winston from 'winston';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const is_dev = process.env.ENV === 'development';
const logger = winston.createLogger({
  level: is_dev ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    enumerateErrorFormat(),
    ...(is_dev
      ? [
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.printf(
            ({ timestamp, level, message }) =>
              `[${timestamp}] ${level}: ${message}`
          ),
        ]
      : [winston.format.uncolorize(), winston.format.json()])
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;

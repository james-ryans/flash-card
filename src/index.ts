import app from "@/app";

import dotenv from 'dotenv';
dotenv.config();

import logger from '@lib/logger';

const port = process.env.PORT;

let server = app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function unexpectedErrorHandler(error: Error) {
  logger.error(error);
  exitHandler();
}

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

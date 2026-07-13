import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import nodesched from 'node-schedule';

import appConfig from './config';
import logger from './logger';
import router from './router';
import wxService from './services/wx.service';

const app = express();

const config = appConfig();

app.set('trust proxy', config.trustProxy);
app.use(morgan('combined'));

if (config.apiBasePath) {
  app.use(config.apiBasePath, router.router);
}

if (!config.disableDefaultApiEndpoint) {
  app.use('/api', router.router);

  const frontendRoot = '/opt/dist/frontend';
  app.use(express.static(frontendRoot));
  app.use((req, res) => res.sendFile(`${frontendRoot}/index.html`));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req: Request, res: Response, next: NextFunction) => {
  logger.error('%o', err);
  
  // 500
  res.status(500).json({ msg: 'an error occurred' });
});

nodesched.scheduleJob('regenerate data', '*/30 * * * *', wxService.wrappedGenerateData);
wxService.wrappedGenerateData();

const server = app.listen(config.port, () => {
  logger.info('application is listening on port %s', config.port);
});

function processShutdown(signal: string) {
  logger.warn('%s signal received. Shutting down.', signal);
  server.close((err) => {
    if (err) {
      logger.error('Failed to shut down server gracefully: %o', err);
      process.exit(1);
    }

    logger.info('Server closed');
    process.exit(0);
  });
}

['SIGTERM', 'SIGINT'].map(signal => process.on(signal, processShutdown.bind(undefined, signal)));

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import nodesched from 'node-schedule';

import appConfig from './config';
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
  console.log('err', err);
  
  // 500
  res.status(500).json({ msg: 'an error occurred' });
});

nodesched.scheduleJob('regenerate data', '*/30 * * * *', wxService.wrappedGenerateData);
wxService.wrappedGenerateData();

const server = app.listen(config.port, () => {
  console.log(
    `application is listening on port ${config.port}`,
  );
});

function processShutdown(signal: string) {
  console.log(`${signal} signal received. Shutting down.`);
  server.close((err) => {
    if (err) {
      console.error(`Failed to shut down server gracefully: ${err}`);
      process.exit(1);
    }

    console.log('Server closed');
    process.exit(0);
  });
}

['SIGTERM', 'SIGINT'].map(signal => process.on(signal, processShutdown.bind(undefined, signal)));

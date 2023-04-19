import express, { NextFunction, Request, Response } from 'express';
import nodesched from 'node-schedule';
import morgan from 'morgan';
import router from './router';
import wxService from './services/wx.service';

const { PORT = 3000, BASE_PATH = '/api', TRUST_PROXY_IP = false } = process.env;

const app = express();

app.set('trust proxy', TRUST_PROXY_IP);
app.use(morgan('combined'));

app.use(BASE_PATH, router.router);

const frontendRoot = '/opt/frontend/dist';
app.use(express.static(frontendRoot));
app.use((req, res) => res.sendFile(`${frontendRoot}/index.html`));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req: Request, res: Response, next: NextFunction) => {
  console.log('err', err);
  
  // 500
  res.status(500).json({ msg: 'an error occurred' });
});

nodesched.scheduleJob('regenerate data', '*/30 * * * * *', wxService.wrappedGenerateData);
wxService.wrappedGenerateData();

const server = app.listen(PORT, () => {
  console.log(
    `application is listening on port ${PORT}`,
  );
});

const shutdown = (signal: string) => {
  console.log(`${signal} signal received. Shutting down.`);
  server.close((err) => {
    if (err) {
      console.error(`Failed to shut down server gracefully: ${err}`);
      process.exit(1);
    }

    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

import express, { NextFunction, Request, Response } from 'express';
import nodesched from 'node-schedule';
import morgan from 'morgan';
import router from './router';
import wxService from './services/wx.service';

const { PORT = 3000 } = process.env;

const app = express();

app.set('trust proxy', true);
app.use(morgan('combined'));

app.use('/api', router.router);

const frontendRoot = '/opt/frontend/dist';
app.use(express.static(frontendRoot));
app.use((req, res) => res.sendFile(`${frontendRoot}/index.html`));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req: Request, res: Response, next: NextFunction) => {
  console.log('err', err);
  
  // 500
  res.status(500).json({ msg: 'an error occurred' });
});

nodesched.scheduleJob('regenerate data', '*/30 * * * * *', wxService.wrappedGenerateData)
wxService.wrappedGenerateData();

app.listen(PORT, () => {
  console.log(
    `application is listening on port ${PORT}`,
  );
});

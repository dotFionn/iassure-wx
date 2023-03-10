import express, { NextFunction, Request, Response } from 'express';
import router from './router';

const { PORT = 3000 } = process.env;

const app = express();

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

app.listen(PORT, () => {
  console.log(
    `application is listening on port ${PORT}`,
  );
});

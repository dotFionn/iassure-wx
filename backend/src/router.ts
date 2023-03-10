import { Request, Response, Router } from 'express';
import fooController from './controllers/foo.controller';

const router = Router();

router.get('/foo', fooController.getFoo);
// aaaaa

router.use((req: Request, res: Response) => {
  // 404
  res.status(404).json({ msg: 'the requested resource could not be found' });
});

export default { router };

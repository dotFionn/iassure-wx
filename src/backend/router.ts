import { Request, Response, Router } from 'express';

import regionController from './controllers/region.controller';
import wxController from './controllers/wx.controller';

const router = Router();

router.get('/regions', regionController.getRegions);
router.get('/regions/:region', regionController.getRegion);
router.get('/regions/:region/wx', wxController.getRegionWx);

router.use((req: Request, res: Response) => {
  // 404
  res.status(404).json({ msg: 'the requested resource could not be found' });
});

export default { router };

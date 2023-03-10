import { Request, Response } from 'express';
import fooService from '../services/foo.service';

function getFoo(req: Request, res: Response) {
  res.json({
    foo: true,
    msg: fooService.getFooDetails(),
    data: req.body,
  });
}

export default {
  getFoo,
};

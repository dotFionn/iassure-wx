import express from 'express';
import wxService from '../services/wx.service';

export async function getRegionWx(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { region } = req.params;
    res.json(wxService.getWx(region));
  } catch (e) {
    next(e);
  }
}

export default {
  getRegionWx,
};

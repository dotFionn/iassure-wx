import express from 'express';
import regionsService from '../services/regions.service';

export async function getRegions(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    res.json(regionsService.getRegions());
  } catch (e) {
    next(e);
  }
}

export async function getRegion(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { region } = req.params;

    const regionData = regionsService.getRegion(region);

    if(!regionData) {
      return next();
    }

    res.json(regionData);
  } catch (e) {
    next(e);
  }
}

export default {
  getRegions,
  getRegion,
};

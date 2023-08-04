import configService from './config.service';

import { WxConfig, WxRegion } from '@/shared/types/config.types';

export function getRegions(): WxConfig['regions'] {
  return configService.getConfig().regions;
}

export function getRegion(identifier: string): WxRegion | undefined {
  const regions = getRegions();

  const region = regions.find(rg => rg.identifier == identifier);

  return region;
}

export default {
  getRegions,
  getRegion,
};

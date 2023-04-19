import configService, { WxConfig, WxRegion } from './config.service';

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

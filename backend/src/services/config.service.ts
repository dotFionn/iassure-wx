import fs from 'fs';

export interface WxConfig {
  regions: WxRegion[];
}

export interface WxRegion {
  identifier: string;
  fixes: WxFix[];
}

export interface WxFix {
  name: string;
  lat: number;
  lon: number;
}

export function getConfig(): WxConfig {
  const data = JSON.parse(fs.readFileSync('/opt/wx-config.json').toString());

  return data;
}

export default {
  getConfig,
}

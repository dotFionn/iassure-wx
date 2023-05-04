import fs from 'fs';
import { WxConfig } from '@shared/types/config.types';


export function getConfig(): WxConfig {
  const data = JSON.parse(fs.readFileSync('/opt/wx-config.json').toString());

  return data;
}

export default {
  getConfig,
};

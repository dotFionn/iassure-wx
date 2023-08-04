import axios from 'axios';

import { WxRegion } from '@/shared/types/config.types';
import { WxData } from '@/shared/types/wx.types';

async function getRegions(): Promise<WxRegion[]> {
  const response = await axios.get<WxRegion[]>('/api/regions');
  return response.data;
}

async function getWxData(region: string): Promise<WxData> {
  const response = await axios.get<WxData>(`/api/regions/${region}/wx`);
  return response.data;
}

export default {
  getRegions,
  getWxData,
};

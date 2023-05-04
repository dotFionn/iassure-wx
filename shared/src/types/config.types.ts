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

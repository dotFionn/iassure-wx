export interface WxLevelData {
  'T(K)': string;
  windspeed: string;
  windhdg: string;
}

export interface WxFixData {
  coords: {
    lat: string;
    long: string;
  };

  levels: {
    [key: string]: WxLevelData;
  }
}

export interface WxData {
  info: {
    date: string;
    datestring: string;
    legal: string;
  };
  data: {
    [key: string]: WxFixData;
  }
}
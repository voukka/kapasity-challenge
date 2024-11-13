export interface Device {
  device_id: string;
  location_name: string;
  latitude: string | number;
  longitude: string | number;
  fullness_level: number;
}

export interface Reading {
  timestamp: string;
  fullness_level: number;
}

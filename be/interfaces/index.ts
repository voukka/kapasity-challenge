export interface Device {
  device_id: string;
  location_name: string;
  latitude: number;
  longitude: number;
}

export interface Reading {
  reading_id: number;
  device_id: string;
  timestamp: string;
  fullness_level: number;
  created_at: string;
}

export interface NewReading {
  device_id: string;
  fullness_level: number;
  timestamp: string;
}

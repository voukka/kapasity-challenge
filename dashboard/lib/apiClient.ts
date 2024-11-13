import axios from "axios";
import { Device, Reading } from "./interfaces";

const apiClient = axios.create({
  baseURL: process.env.BE_API_PREFIX, //'http://localhost:3000/api'
});

// Fetch devices and convert latitude and longitude to numbers
export async function fetchDevices(): Promise<Device[]> {
  const response = await apiClient.get<Device[]>("/devices");
  return response.data.map((device) => ({
    ...device,
    latitude: Number(device.latitude),
    longitude: Number(device.longitude),
  }));
}

export async function fetchDeviceReadings(
  deviceId: string,
): Promise<Reading[]> {
  const response = await apiClient.get<Reading[]>(
    `/devices/${deviceId}/readings`,
  );

  // Sort readings by timestamp in ascending order
  return response.data.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

export default apiClient;

import {useEffect, useState} from "react";
import {fetchDeviceReadings, fetchDevices} from "@/lib/apiClient";
import DeviceMap from "../components/DeviceMap";
import {Device, Reading} from "@/lib/interfaces";
import {FullnessChart} from "@/components/FullnessChart";

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    // Fetch list of devices
    fetchDevices()
      .then((response) => setDevices(response))
      .catch((error) => console.error("Failed to fetch devices", error));
  }, []);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);

    // Fetch and display readings for the selected device
    fetchDeviceReadings(device.device_id)
      .then((sortedReadings) => setReadings(sortedReadings))
      .catch((error) => console.error("Failed to fetch readings", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compactors Dashboard</h1>

      <div className="mb-6">
        <DeviceMap devices={devices} selectedDevice={selectedDevice} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-2">Devices</h2>
          <ul className="border rounded p-4 h-64 overflow-y-auto">
            {devices.map((device) => (
              <li
                key={device.device_id}
                onClick={() => handleDeviceClick(device)}
                className={`cursor-pointer p-2 rounded ${
                  selectedDevice?.device_id === device.device_id
                    ? "bg-blue-500 text-white" // Highlight selected device
                    : "hover:bg-gray-200"
                }`}
              >
                <p>{device.location_name}</p>
                <p>Status: {device.fullness_level}% full</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-2/3">
          {selectedDevice && (
            <>
              <h2 className="text-xl font-semibold mb-2">
                Fullness of {selectedDevice.device_id} at{" "}
                {selectedDevice.location_name}
              </h2>
              <FullnessChart data={readings}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

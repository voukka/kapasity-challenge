import React, {useEffect, useRef} from "react";
import {GoogleMap, Libraries, useJsApiLoader} from "@react-google-maps/api";

import {Device} from "../lib/interfaces";

interface DeviceMapProps {
  devices: Device[];
  selectedDevice: Device | null;
}
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Set initial center to Helsinki coordinates
const initialCenter = {
  lat: 60.1699,
  lng: 24.9384,
};

const libraries = ["marker"] as Libraries; // Load the marker library to access AdvancedMarkerElement
const DeviceMap: React.FC<DeviceMapProps> = ({ devices, selectedDevice }) => {
  const { isLoaded } = useJsApiLoader({
    mapIds: ["ced87bc6e1add5cb"],
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries, //
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Function to initialize markers
  const initializeMarkers = (
    map: google.maps.Map | null,
    devices: Device[],
  ) => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    // Store markers in ref to avoid re-renders
    markersRef.current = devices.map(
        (device) => {
            const pin = document.createElement("div");
            pin.style.position = "absolute"; // Ensure the pin is positioned correctly
            pin.innerHTML = `
          <div style="
            background: ${device.fullness_level >= 80 ? "red" : "green"};
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;">
            ${device.device_id} - ${device.fullness_level}%
          </div>
        `;

            const markerElement = new google.maps.marker.AdvancedMarkerElement({
                position: {
                    lat: Number(device.latitude),
                    lng: Number(device.longitude),
                },
                content: pin,
            });

            // Attach marker to map
            markerElement.map = map;
            return markerElement;
        },
    );
  };

  // Determine the initial center based on the device with the highest fullness level
  const getInitialCenter = () => {
    if (devices.length === 0) return initialCenter;

    const highestFullnessDevice = devices.reduce((prev, current) => {
      return current.fullness_level > prev.fullness_level ? current : prev;
    }, devices[0]);

    return {
      lat: Number(highestFullnessDevice.latitude),
      lng: Number(highestFullnessDevice.longitude),
    };
  };

  // Center map on selected device when it changes
  useEffect(() => {
    if (selectedDevice && mapRef.current) {
      mapRef.current.setCenter({
        lat: Number(selectedDevice.latitude),
        lng: Number(selectedDevice.longitude),
      });
    }
  }, [selectedDevice]);

  // Re-initialize markers when `devices` changes
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      initializeMarkers(mapRef.current, devices);
    }
  }, [isLoaded, devices]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      options={{ mapId: "ced87bc6e1add5cb" }}
      center={
        selectedDevice
          ? {
              lat: Number(selectedDevice.latitude),
              lng: Number(selectedDevice.longitude),
            }
          : getInitialCenter() // Use highest fullness level for initial center
      }
      onLoad={(map) => {
        mapRef.current = map;
        initializeMarkers(map, devices); // Initialize markers when map loads
      }}
    />
  );
};

export default DeviceMap;

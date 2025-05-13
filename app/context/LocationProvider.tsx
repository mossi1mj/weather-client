"use client";

import { useEffect, useState } from "react";
import { Coords, LocationContext} from "./LocationContext";


export default function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<Coords>({
    lat: 42.3314,
    lon: -83.0458,
  });

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported. Using default.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error.message, "Using default location.");
        }
      );
    };

    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={coords}>
      {children}
    </LocationContext.Provider>
  )
}

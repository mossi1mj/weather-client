"use client";

import { useEffect, useState } from "react";
import { City, LocationContext } from "./LocationContext";

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    async function fetchLocation(lat: number, lon: number) {
      try {
        const res = await fetch(
          `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const data = await res.json();

        setCity({
          name: data.city || "Current Location",
          lat,
          lon,
          country: data.countryName || "Unknown",
          admin1: data.principalSubdivision || "",
        });
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
        setCity({
          name: "Current Location",
          lat,
          lon,
          country: "Unknown",
        });
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchLocation(lat, lon);
        },
        (error) => {
          console.warn(
            "Geolocation error:",
            error.message,
            "Using default location."
          );
          setCity({
            id: 4990729,
            name: "Detroit",
            lat: 42.33143,
            lon: -83.04575,
            country: "United States",
            admin1: "Michigan",
          });
        }
      );
    }
  }, []);

  return (
    <LocationContext.Provider value={{ city, setCity }}>
      {children}
    </LocationContext.Provider>
  );
}
"use client";

import { useEffect, useState } from "react";
import { City, LocationContext } from "./LocationContext";

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [city, setCity] = useState<City | null>(null);

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await res.json();

          setCity({
            name: data.city || "Unknown",
            lat,
            lon,
            country: data.countryName || "Unknown",
            admin1: data.principalSubdivision,
          });
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
        }
      },
      (error) => {
        console.log("Geolocation error:", error.message, "Using fallback.");
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
  };
  
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ city, setCity, fetchCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

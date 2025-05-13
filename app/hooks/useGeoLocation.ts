import { useEffect, useState } from "react";

type Coords = {
  lat: number;
  lon: number;
};

export function useGeoLocation(defaultCoords: Coords = { lat: 42.3314, lon: -83.0458 }) {
  const [coords, setCoords] = useState<Coords>(defaultCoords);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported, using default.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.warn("Geolocation error:", error.message, "Using default coords.");
          setCoords(defaultCoords);
          setLoading(false);
        }
      );
    };

    getLocation();
  }, [defaultCoords]);

  return { coords, loading };
}

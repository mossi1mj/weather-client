import { createContext, useContext } from "react";

export type Coords = {
  lat: number;
  lon: number;
};

export const LocationContext = createContext<Coords>({
  lat: 42.3314,  // Default: Detroit
  lon: -83.0458,
});

export const useLocation = () => useContext(LocationContext);

import { createContext, useContext } from "react";

export type City = {
  id?: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
  admin1?: string;
};

export type LocationContextType = {
  city: City | null;
  setCity: React.Dispatch<React.SetStateAction<City | null>>;
  fetchCurrentLocation: () => void;
};

export const LocationContext = createContext<LocationContextType>({
  city: null,
  setCity: () => {},
  fetchCurrentLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

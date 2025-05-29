"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLocation } from "@/app/context/LocationContext";

const FormSchema = z.object({
  city: z.string().min(1, "Please select a location"),
});

interface CityResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export function SearchBar() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { setCity } = useLocation();
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<CityResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (query.length < 3) return;
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en`
        );
        const data = await res.json();
        setCities(data.results || []);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      }
    };

    const timeout = setTimeout(() => fetchCities(), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (city: CityResult) => {
    setSelectedCity(city);
    form.setValue("city", city.name);
    setCity({
        lat: city.latitude,
        lon: city.longitude,
        name: city.name,
        country: city.country,
        admin1: city.admin1,
        id: city.id,
    });
  };

  return (
    <Form {...form}>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Search for a city</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {selectedCity
                        ? `${selectedCity.name}, ${
                            selectedCity.admin1 ?? ""
                          }, ${selectedCity.country}`
                        : "Select location"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search city..."
                      onValueChange={(val) => setQuery(val)}
                    />
                    <CommandList>
                      <CommandEmpty>No cities found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => handleSelect(city)}
                          >
                            {city.name}, {city.admin1 ?? ""}, {city.country}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedCity?.id === city.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
    </Form>
  );
}

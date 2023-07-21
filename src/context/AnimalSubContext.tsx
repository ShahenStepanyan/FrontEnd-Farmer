import React, { useEffect, useState } from "react";
import animalTypeService from "../services/animalTypes";
import animalSubTypeService from "../services/animalSub";

import type {AnimalSubTypesModel, AnimalSubTypes} from "../types/AnimalSubTypes"

const defaultValue: {
  animalType: any;
  addItem: (item: AnimalSubTypes) => Promise<AnimalSubTypesModel>;
  updateItem: (id: string, item: AnimalSubTypesModel) => Promise<void>;
  removeItem: (item: AnimalSubTypesModel) => Promise<void>;
} = {
  animalType: [],
  addItem: async () => {
    return { _id: "", name: "" };
  },
  updateItem: async () => {},
  removeItem: async () => {},
};

export const AnimalSubTypesContext = React.createContext(defaultValue);

export default function AnimalTypesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animalType, setAnimalTypes] = useState(defaultValue.animalType);

  useEffect(() => {
    animalSubTypeService.find().then(setAnimalTypes);
  }, []);
  
  const addItem = async (item: any) => {
    const newItem = await animalSubTypeService.create(item);
    setAnimalTypes((oldValues: any) => [...oldValues, newItem]);
    return newItem;
  };

  const updateItem = async (id: string, item: any) => {
    const updatedAnimalType = await animalSubTypeService.update(id, item);
    const index = animalType.findIndex((item: any) => item._id === id);
    animalType[index] = updatedAnimalType;
    setAnimalTypes([...animalType]);
  };

  const removeItem = async ({ _id }: any) => {
    await animalSubTypeService.remove(_id);
    setAnimalTypes(animalType.filter((item: any) => item._id !== _id));
  };

  return (
    <AnimalSubTypesContext.Provider
      value={{
        animalType,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </AnimalSubTypesContext.Provider>
  );
}

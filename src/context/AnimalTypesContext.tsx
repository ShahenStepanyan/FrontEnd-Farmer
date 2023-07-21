import React, { useEffect, useState } from "react";
import animalTypeService from "../services/animalTypes";

import type { AnimalTypesModel, AnimalTypes } from "../types/AnimalTypes";

const defaultValue: {
  animalTypes: Array<AnimalTypesModel>;
  addItem: (item: AnimalTypes) => Promise<AnimalTypesModel>;
  updateItem: (id: string, item: AnimalTypesModel) => Promise<void>;
  removeItem: (item: AnimalTypesModel) => Promise<void>;
} = {
  animalTypes: [],
  addItem: async () => {
    return { _id: "", name: "" };
  },
  updateItem: async () => {},
  removeItem: async () => {},
};

export const AnimalTypesContext = React.createContext(defaultValue);

export default function AnimalTypesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animalTypes, setAnimalTypes] = useState(defaultValue.animalTypes);

  useEffect(() => {
    animalTypeService.find().then(setAnimalTypes);
  }, []);

  const addItem = async (item: AnimalTypes) => {
    const newItem = await animalTypeService.create(item);
    setAnimalTypes((oldValues) => [...oldValues, newItem]);
    return newItem;
  };

  const updateItem = async (id: string, item: AnimalTypesModel) => {
    const updatedAnimalType = await animalTypeService.update(id, item);
    const index = animalTypes.findIndex((item) => item._id === id);
    animalTypes[index] = updatedAnimalType;
    setAnimalTypes([...animalTypes]);
  };

  const removeItem = async ({ _id }: AnimalTypesModel) => {
    await animalTypeService.remove(_id);
    setAnimalTypes(animalTypes.filter((item) => item._id !== _id));
  };

  return (
    <AnimalTypesContext.Provider
      value={{
        animalTypes,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </AnimalTypesContext.Provider>
  );
}

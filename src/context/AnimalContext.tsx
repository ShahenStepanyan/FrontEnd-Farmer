import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import animalsService from "../services/animals";
import weightsService from "../services/weights";

import type { Animal, AnimalModel } from "../types/Animal";
import type { WeightModel } from "../types/Weight";

type ValueType = {
  animal?: AnimalModel;
  weights: Array<WeightModel>;
  loading: boolean;
  updateAnimal: (values: Partial<Animal>) => Promise<void>;
  getAndSetAnimal: () => Promise<void>;
  getAndSetWeights: () => Promise<void>;
};

const defaultValue: ValueType = {
  weights: [],
  loading: false,
  updateAnimal: async () => {},
  getAndSetAnimal: async () => {},
  getAndSetWeights: async () => {},
};

export const AnimalContext = React.createContext(defaultValue);

export default function AnimalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const [animal, setAnimal] = useState<ValueType["animal"]>();
  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState<ValueType["weights"]>([]);

  const getAndSetAnimal: ValueType["getAndSetAnimal"] = useCallback(
    () =>
      animalsService
        .findById(id as string)
        .then(setAnimal)
        .finally(() => setLoading(false)),
    [id]
  );

  const getAndSetWeights: ValueType["getAndSetWeights"] = useCallback(
    () =>
      weightsService.find({ animal: id, sort: { date: 1 } }).then(setWeights),
    [id]
  );

  useEffect(() => {
    if (!id || id === animal?._id) {
      return;
    }
    setLoading(true);
    if (!!animal) {
      setAnimal(undefined);
      setWeights([]);
    }
    getAndSetAnimal();
    getAndSetWeights();
  }, [id, animal?._id]);

  const updateAnimal: ValueType["updateAnimal"] = useCallback(
    async (values) => {
      if (!animal?._id) {
        return;
      }
      const updatedItem = await animalsService.update(animal?._id, values);
      if (updatedItem.weight !== animal.weight) {
        getAndSetWeights();
      }
      setAnimal({ ...animal, ...updatedItem });
    },
    [animal]
  );

  return (
    <AnimalContext.Provider
      value={{
        animal,
        weights,
        loading,
        getAndSetAnimal,
        getAndSetWeights,
        updateAnimal,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
}

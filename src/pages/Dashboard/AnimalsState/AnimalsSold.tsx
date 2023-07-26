
import animalsTypesService from "../../../services/animalTypes";
import { useEffect, useState } from "react";
import { AnimalTypes } from "../../../types/AnimalTypes";
import "../style.less";
import { getAnimalsSold } from "../../../services/getAnimalsSold";

interface AnimalsSoldData {
  [animalTypeId: string]: any;
}

export default function AnimalsSold() {
  
  const [animals, setAnimals] = useState<AnimalsSoldData>({}); 
  const [animalsTypes, setAnimalsTypes] = useState<AnimalTypes[]>([]);

  useEffect(() => {
    getAnimalsSold().then(setAnimals);
  }, []);

  useEffect(() => {
    animalsTypesService.find().then(setAnimalsTypes);
  }, []);
  
  return (
    <>
      <div className="default-parametr-state">
        <h3>Animals Sold</h3>
        <ul>
          {animalsTypes.map((item: AnimalTypes) => { // +
           const animalCount = animals[item._id ?? ''] ?? 0;
            return (
              <li key={item._id}>
                <strong>{item.name}: </strong>
                {animalCount}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

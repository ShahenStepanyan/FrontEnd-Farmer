
import animalsTypesService from "../../../services/animalTypes";
import { useEffect, useState } from "react";
import { AnimalTypes } from "../../../types/AnimalTypes";
import "../style.less";
import { getAnimalsSold } from "../../../services/getAnimalsSold";



export default function AnimalsSold() {
  
  const [animals, setAnimals] = useState<{[_id: number]: any}>({}); // +
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
          {animalsTypes.map((item: any) => { // +
            return (
              <li key={item._id}>
                <strong>{item.name}: </strong>
                {animals[item._id] || 0}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

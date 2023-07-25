
import animalsTypesService from "../../../services/animalTypes";
import { useEffect, useState } from "react";
import { AnimalTypes } from "../../../types/AnimalTypes";
import "../style.less";
import { getAnimalsDied } from "../../../services/getAnimalsDied";


export default function AnimalsState() {
  
  const [animals, setAnimals] = useState<{[_id: string]: any}>({}); // +
  const [animalsTypes, setAnimalsTypes] = useState<AnimalTypes[]>([]);

  useEffect(() => {
    getAnimalsDied().then(setAnimals);
  }, []);

  useEffect(() => {
    animalsTypesService.find().then(setAnimalsTypes);
  }, []);

  return (
    <>
      <div className="default-parametr-state">
        <h3>Animals Died</h3>
        <ul>
          {animalsTypes.map((item : any) => { // +
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

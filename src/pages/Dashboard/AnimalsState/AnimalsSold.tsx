import animalsService from "../../../services/animals";
import animalsTypesService from "../../../services/animalTypes";
import { useEffect, useState } from "react";
import { AnimalModel } from "../../../types/Animal";
import { AnimalTypes } from "../../../types/AnimalTypes";

export default function AnimalsSoldComp() {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [animalsTypes, setAnimalsTypes] = useState<AnimalTypes[]>([]);
  useEffect(() => {
    animalsService.find({ removed: true , deregisterReason: "628bc213096d05d7cacea38e"}).then(setAnimals);
  }, []);
  useEffect(() => {
    animalsTypesService.find().then(setAnimalsTypes);
  }, []);
  
  return (
    <>
      <div
        style={{
          width: "25%",
          marginLeft: "25px",
          backgroundColor: "white",
          padding: "20px",
          marginTop: "30px",
          borderRadius: "15px",
        }}
      >
        <h3>Animals Sold</h3>
        <ul>
          {animalsTypes.map((item) => {
            const result: any[] = [];
            return (
              <li>
                <strong>{item.name}: </strong>
                {animals.map((value, index) => {
                  if (value.animalType === item._id) {
                    result.push(value);
                  }
                  if(animals.length === index + 1) {
                    return result.length
                  }
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

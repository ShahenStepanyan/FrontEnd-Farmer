import { BaseModel } from ".";

export type AnimalSoldDead = {
  name: string;
  animalType?: string;
  _id?: string;
};

export type AnimalSoldDeadTypesModel = BaseModel<AnimalSoldDead>;

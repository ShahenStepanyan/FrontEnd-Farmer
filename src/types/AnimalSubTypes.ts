import { BaseModel } from ".";

export type AnimalSubTypes = {
  name: string;
  animalType?: string
  _id?: string
};

export type AnimalSubTypesModel = BaseModel<AnimalSubTypes>;

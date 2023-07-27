import { BaseModel } from ".";

export type AnimalTypes = {
  name  : string;
  _id?: string;
  animals?: string
};

export type AnimalTypesModel = BaseModel<AnimalTypes>;

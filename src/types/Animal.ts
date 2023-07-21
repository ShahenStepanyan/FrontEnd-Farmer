import { BaseModel } from ".";

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
}

export type Animal = {
  animalType: string;
  serialNumber: string;
  weight: number;
  gender: GenderEnum;
  father?: string;
  parent?: string;
  fatherNumber?: string;
  subTypes?: string;
  name?: string;
  parentNumber?: string;
  birthDate: string | moment.Moment;
  deregisterReason?: string;
  deregisterNote?: string;
  deregisterDate?: string | moment.Moment;
  deregisterSubReason?: string;
};

export type AnimalModel = BaseModel<Animal>;

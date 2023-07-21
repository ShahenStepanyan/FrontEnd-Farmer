import { BaseModel } from ".";
import moment from "moment";

export type Weight = {
  weight: number;
  date: string | moment.Moment;
  animal: string;
  animalType: string;
};

export type WeightModel = BaseModel<Weight>;

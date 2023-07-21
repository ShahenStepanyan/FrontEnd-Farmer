import { BaseModel } from ".";
export type SpendingEventsType = {
  amount: string
  type: string
  date: string
  _id: string
};


export type UserModel = BaseModel<SpendingEventsType>;

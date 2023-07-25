import { BaseModel } from ".";

export type Problem = {
  name: string;
  problem: string;
  _id: string;
  onBirth: Date;
  type: string;
  animal: string

};

export type ProblemModel = BaseModel<Problem>;

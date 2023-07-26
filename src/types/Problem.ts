import { BaseModel } from ".";

export type Problem = {
  name: string;
  problem: string;
  _id: string;
  onBirth: boolean;
  type: string;
  animal: string

};

export type ProblemModel = BaseModel<Problem>;

import { BaseModel } from ".";

export enum RoleEnum {
  ADMIN = "admin",
  EDITOR = "editor",
}

export type UserType = {
  email: string;
  role: RoleEnum;
  firstName: string;
  lastName: string;
  token?: string;
};

export type UserModel = BaseModel<UserType>;

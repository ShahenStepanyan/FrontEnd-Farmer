import { RoleEnum } from "./User";

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  path: string;
  roles?: Array<RoleEnum>;
  children?: Array<MenuItem>;
};

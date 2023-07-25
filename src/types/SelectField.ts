import { BaseModel } from ".";

export enum SelectFieldTypeEnum {
  DEREGISTER = "deregister",
  PROBLEM = "problem",
}

export type SelectField = {
  name: string;
  type: string;
  _id?: string
  subFieldIsRequired: boolean;
};

export type SelectSubField = {
  name: string;
  selectField: string;
};

export type SelectFieldModel = BaseModel<SelectField>;

export type SelectSubFieldModel = BaseModel<SelectSubField>;

export type SelectFieldAndSubFields = SelectFieldModel & {
  subFields: Array<SelectSubFieldModel>;
};

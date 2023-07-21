import React, { useEffect, useState } from "react";
import selectFieldsService from "../services/selectFields";
import selectSubFieldsService from "../services/selectSubFields";

import {
  SelectFieldModel,
  SelectField,
  SelectSubFieldModel,
  SelectFieldAndSubFields,
  SelectSubField,
  SelectFieldTypeEnum,
} from "../types/SelectField";

const defaultValue: {
  selectFields: Array<SelectFieldAndSubFields>;
  addItem: (item: SelectField) => Promise<SelectFieldModel>;
  updateItem: (id: string, item: SelectFieldModel) => Promise<void>;
  removeItem: (item: SelectFieldModel) => Promise<void>;
  addSubField: (item: SelectSubField) => Promise<SelectSubFieldModel>;
  updateSubField: (item: SelectSubFieldModel) => Promise<void>;
  removeSubField: (item: SelectSubFieldModel) => Promise<void>;
} = {
  selectFields: [],
  addItem: async () => {
    return {
      _id: "",
      name: "",
      type: SelectFieldTypeEnum.DEREGISTER,
      subFieldIsRequired: false,
    };
  },
  updateItem: async () => {},
  removeItem: async () => {},
  updateSubField: async () => {},
  removeSubField: async () => {},
  addSubField: async () => {
    return { _id: "", name: "", selectField: "" };
  },
};

export const SelectFieldsContext = React.createContext(defaultValue);

export default function SelectFieldsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectFields, setSelectFields] = useState(defaultValue.selectFields);

  useEffect(() => {
    Promise.all([
      selectFieldsService.find(),
      selectSubFieldsService.find(),
    ]).then(([selectFields, selectSubFields]) => {
      const selectSubFieldsMap: Record<string, Array<SelectSubFieldModel>> = {};
      for (const selectSubField of selectSubFields) {
        if (!selectSubFieldsMap[selectSubField.selectField]) {
          selectSubFieldsMap[selectSubField.selectField] = [];
        }
        selectSubFieldsMap[selectSubField.selectField].push(selectSubField);
      }
      setSelectFields(
        selectFields.map((selectField) => ({
          ...selectField,
          subFields: selectSubFieldsMap[selectField._id] || [],
        }))
      );
    });
  }, []);

  const addItem = async (item: SelectField) => {
    const newItem = await selectFieldsService.create(item);
    setSelectFields((oldValues) => [
      ...oldValues,
      { ...newItem, subFields: [] },
    ]);
    return newItem;
  };

  const addSubField = async (item: SelectSubField) => {
    const newItem = await selectSubFieldsService.create(item);
    const index = selectFields.findIndex(
      (selectField) => selectField._id === item.selectField
    );
    selectFields[index] = {
      ...selectFields[index],
      subFields: [...selectFields[index].subFields, newItem],
    };
    setSelectFields([...selectFields]);
    return newItem;
  };

  const updateItem = async (id: string, item: SelectFieldModel) => {
    const updatedItem = await selectFieldsService.update(id, item);
    const index = selectFields.findIndex((item) => item._id === id);
    selectFields[index] = { ...selectFields[index], ...updatedItem };
    setSelectFields([...selectFields]);
  };

  const removeItem = async ({ _id }: SelectFieldModel) => {
    await selectFieldsService.remove(_id);
    setSelectFields(selectFields.filter((item) => item._id !== _id));
  };

  const removeSubField = async ({ _id, selectField }: SelectSubFieldModel) => {
    await selectSubFieldsService.remove(_id);
    const selectFieldIndex = selectFields.findIndex(
      (item) => item._id == selectField
    );
    selectFields[selectFieldIndex] = {
      ...selectFields[selectFieldIndex],
      subFields: selectFields[selectFieldIndex].subFields.filter(
        (item) => item._id !== _id
      ),
    };
    setSelectFields([...selectFields]);
  };

  const updateSubField = async ({
    _id,
    selectField: selectFieldId,
    name,
  }: SelectSubFieldModel) => {
    const updatedItem = await selectSubFieldsService.update(_id, { name });
    const selectFieldIndex = selectFields.findIndex(
      (item) => item._id == selectFieldId
    );
    const selectField = selectFields[selectFieldIndex];
    const selectSubFieldIndex = selectField.subFields.findIndex(
      (item) => item._id == _id
    );
    selectFields[selectFieldIndex].subFields.splice(
      selectSubFieldIndex,
      1,
      updatedItem
    );
    selectFields[selectFieldIndex] = {
      ...selectFields[selectFieldIndex],
      subFields: [...selectFields[selectFieldIndex].subFields],
    };
    setSelectFields([...selectFields]);
  };

  return (
    <SelectFieldsContext.Provider
      value={{
        selectFields,
        addItem,
        updateItem,
        removeItem,
        addSubField,
        removeSubField,
        updateSubField,
      }}
    >
      {children}
    </SelectFieldsContext.Provider>
  );
}

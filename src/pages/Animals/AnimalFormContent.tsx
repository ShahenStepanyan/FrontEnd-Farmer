import { useContext, useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Spin,
} from "antd";
import SelectCreate from "../../components/SelectCreate";
import { AnimalTypesContext } from "../../context/AnimalTypesContext";
import animalsService from "../../services/animals";
import { GenderEnum } from "../../types/Animal";
import { useTranslation } from "react-i18next";
import moment from "moment";

import type { Animal, AnimalModel } from "../../types/Animal";
import type { AnimalTypesModel } from "../../types/AnimalTypes";
import animalSubTypeService from "../../services/animalSub";
import { AnimalSubTypesModel } from "../../types/AnimalSubTypes";

const { Option } = Select;
const FormItem = Form.Item;

const AnimalFormContent = ({
  initialValues,
  form,
}: {
  initialValues?: Partial<Animal>;
  form?: FormInstance<Animal>;
}) => {
  const { animalTypes, addItem: addAnimalType } =
    useContext(AnimalTypesContext);
  const [animalType, setAnimalType] = useState<AnimalTypesModel | undefined>(
    animalTypes[0]
  );
  const [parentOptions, setParentOptions] = useState<Array<AnimalModel>>([]);
  const [spinning, setSpinning] = useState(false);
  const { t } = useTranslation("animals");
  const [selectSubFields, setSelectSubFields] = useState<AnimalSubTypesModel[]>(
    []
  );

  const handleParentSearch = async (value?: string) => {
    if (!animalType) {
      setParentOptions([]);
      return;
    }
    const condition: Parameters<typeof animalsService.find>[0] = {
      animalType: animalType._id,
      gender: GenderEnum.FEMALE,
      limit: 6,
    };
    if (value) {
      condition.serialNumber = { $regex: value };
    }
    const femaleAnimals = await animalsService.find(condition);
    setParentOptions(femaleAnimals);
  };

  useEffect(() => {
    if (initialValues?.animalType) {
      const newAnimalType = animalTypes.find(
        (item) => item._id === initialValues.animalType
      );
      if (newAnimalType?._id === animalType?._id) {
        return;
      }
      setAnimalType(newAnimalType);
      return;
    }
    if (animalType) {
      return;
    }
    setAnimalType(animalTypes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalType, animalTypes]);

  useEffect(() => {
    handleParentSearch();
  }, [animalType, handleParentSearch]);

  useEffect(() => {
    animalSubTypeService.find().then(setSelectSubFields);
  }, []);

  useEffect(() => {
    // TODO: think about this
    if (!form || !animalType?._id || initialValues?.serialNumber) {
      return;
    }
    animalsService
      .find({
        animalType: animalType._id,
        limit: 1,
        sort: { serialNumber: "desc" },
      })
      .then((result) => {
        const [lastAnimal] = result;
        const lastSerialNumber = String(
          (Number(lastAnimal?.serialNumber) || 0) + 1
        );
        form.setFieldsValue({ serialNumber: lastSerialNumber });
      });
  }, [animalType, form, initialValues?.serialNumber]);

  const handleAnimalTypeAdd = async (value: string) => {
    setSpinning(true);
    const newAnimalType = await addAnimalType({ name: value });
    setAnimalType(newAnimalType);
    setSpinning(false);
  };

  return (
    <Spin spinning={spinning}>
      <FormItem name="animalType" label={t("Animal Type")}>
        <SelectCreate
          value={animalType?._id}
          disabled={!!initialValues?.animalType}
          onCreate={handleAnimalTypeAdd}
          createPlaceholder={t("Name")}
          onChange={(value) =>
            setAnimalType(animalTypes.find((item) => item._id === value))
          }
          options={animalTypes.map((animalType) => ({
            label: animalType.name,
            value: animalType._id,
          }))}
        />
      </FormItem>
      <FormItem name="serialNumber" label={t("Serial Number")}>
        <InputNumber />
      </FormItem>

      <FormItem name="subTypes" label={t("Animal Sub")}>
        <Select
          options={selectSubFields.map((item) => ({
            label: item.name,
            value: item._id,
          }))}
        />
      </FormItem>
      <FormItem name="weight" label={t("Weight")}>
        <InputNumber />
      </FormItem>
      <FormItem name="gender" label={t("Gender")}>
        <Select>
          <Option value={GenderEnum.MALE}>{t(GenderEnum.MALE)}</Option>
          <Option value={GenderEnum.FEMALE}>{t(GenderEnum.FEMALE)}</Option>
        </Select>
      </FormItem>
      <FormItem name="parent" label={t("Parent")}>
        {/**
         * @todo Improve this select
         * @see https://codesandbox.io/s/fe00eu
         */}
        <Select
          showSearch
          allowClear
          disabled={!animalType?._id || !!initialValues?.parent}
          filterOption={false}
          onSearch={handleParentSearch}
          placeholder={t("Select a parent")}
          optionFilterProp="children"
        >
          {parentOptions.map((animal) => (
            <Option key={animal._id} value={animal._id}>
              {Number(animal.serialNumber)}
            </Option>
          ))}
        </Select>
      </FormItem>
      <FormItem name="birthDate" label={t("Date")}>
        <DatePicker disabledDate={(date) => moment() < date} />
      </FormItem>
    </Spin>
  );
};

export default AnimalFormContent;

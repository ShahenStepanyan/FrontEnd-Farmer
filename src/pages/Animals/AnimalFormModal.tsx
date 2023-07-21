import { useContext, useState } from "react";
import { FormInstance } from "antd";
import ModalForm from "../../components/ModalForm";
import AnimalFormContent from "./AnimalFormContent";
import { AnimalTypesContext } from "../../context/AnimalTypesContext";
import { GenderEnum } from "../../types/Animal";
import moment from "moment";

import type { Animal } from "../../types/Animal";
import type { ModalFormProps } from "../../components/ModalForm";

const AnimalForm = ({
  visible,
  onCancel,
  title,
  onOk,
  initialValues,
}: Omit<ModalFormProps<Animal>, "children">) => {
  const { animalTypes } = useContext(AnimalTypesContext);
  const [form, setForm] = useState<FormInstance<Animal>>();

  return (
    <ModalForm<Animal>
      title={title}
      initForm={setForm}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      initialValues={{
        animalType: animalTypes[0]?._id,
        gender: GenderEnum.MALE,
        weight: 0,
        birthDate: moment(),
        ...initialValues,
      }}
    >
      
      <AnimalFormContent form={form} initialValues={initialValues} />
    </ModalForm>
  );
};

export default AnimalForm;

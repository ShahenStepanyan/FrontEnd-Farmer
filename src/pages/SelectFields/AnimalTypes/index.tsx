import { useContext, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalForm from "../../../components/ModalForm";
import List from "./List";

import { useTranslation } from "react-i18next";
import { AnimalTypesContext } from "../../../context/AnimalTypesContext";

import type { AnimalTypesModel } from "../../../types/AnimalTypes";
import { useEffect } from "react";
import animalSubTypeService from "../../../services/animalSub"
function AnimalTypes() {
  const [formModal, setFormModal] = useState<boolean>(false);
  const { animalTypes, addItem, updateItem, removeItem } = useContext(AnimalTypesContext);
  const [editItem, setEditItem] = useState<AnimalTypesModel>();
  const { t } = useTranslation("selectFields");
  useEffect(() => {
    animalSubTypeService.find().then()
  },[])
  const handleAddOrEdit = async (values: AnimalTypesModel) => {
    if (editItem?._id) {
      await updateItem(editItem._id, values);
    } else {
      await addItem(values);
    }
    setFormModal(false);
  };
  return (
    <Card
      title={t("Animal Types")}
      extra={
        <Button
          onClick={() => setFormModal(true)}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          {t("Add")}
        </Button>
      }
    >
      <ModalForm
        title={t("Add")}
        visible={formModal}
        onCancel={() => {
          setFormModal(false);
          setEditItem(undefined);
        }}
        onOk={handleAddOrEdit}
        initialValues={editItem}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: t("Name is required!") }]}
        >
          <Input placeholder={t("Name")} />
        </Form.Item>
      </ModalForm>
      <List
     
        data={animalTypes}
        onEdit={(row) => {
          setEditItem(row);
          setFormModal(true);
        }}
        onDelete={removeItem}
      />
    </Card>
  );
}

export default AnimalTypes;

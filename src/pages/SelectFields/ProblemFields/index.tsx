import { useContext, useMemo, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalForm from "../../../components/ModalForm";
import List from "./List";
import { SelectFieldsContext } from "../../../context/SelectFieldsContext";
import { useTranslation } from "react-i18next";
import {
  SelectFieldModel,
  SelectFieldTypeEnum,
} from "../../../types/SelectField";

function ProblemFields() {
  const { selectFields, addItem, updateItem, removeItem } =
    useContext(SelectFieldsContext);
  const problemFields = useMemo(
    () =>
      selectFields.filter((item) => item.type === SelectFieldTypeEnum.PROBLEM),
    [selectFields]
  );
  const [formModal, setFormModal] = useState(false);
  const [editItem, setEditItem] = useState<SelectFieldModel>();
  const { t } = useTranslation("selectFields");

  const handleAddOrEdit = async (values: any) => {
    if (editItem?._id) {
      await updateItem(editItem._id, values);
    } else {
      await addItem({ type: SelectFieldTypeEnum.PROBLEM, ...values });
    }
    setFormModal(false);
  };

  return (
    <Card
      title={t("Problem Fields")}
      style={{ marginTop: 16 }}
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
        data={problemFields}
        onEdit={(row) => {
          setEditItem(row);
          setFormModal(true);
        }}
        onDelete={removeItem}
      />
    </Card>
  );
}

export default ProblemFields;

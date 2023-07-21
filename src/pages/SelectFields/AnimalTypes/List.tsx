import { Button, Popconfirm, Table } from "antd";
import { useContext, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useScreenSize from "../../../hooks/useScreenSize";
import { useTranslation } from "react-i18next";
import "../styles.less";
import type { AnimalsSubFieldsProps } from "./AnimalsSubFields";
import AnimalsSubFields  from "./AnimalsSubFields";
import ModalForm from "../../../components/ModalForm";
import type { AnimalTypesModel } from "../../../types/AnimalTypes";
import { SelectSubFieldModel } from "../../../types/SelectField";
import { SelectFieldsContext } from "../../../context/SelectFieldsContext";
import { AnimalSubTypesContext } from "../../../context/AnimalSubContext";
import { Form, Input } from "antd";
import animalSubTypeService from "../../../services/animalSub"
import { TypePredicateKind } from "typescript";

type AnimalTypesListProps = {
  data: Array<AnimalTypesModel>;
  onEdit: (item: AnimalTypesModel) => void;
  onDelete: (item: AnimalTypesModel) => void;
};

const AnimalTypesList = ({ data, onEdit, onDelete }: AnimalTypesListProps) => {
  const { height } = useScreenSize();
  const {addItem, removeItem, updateItem} = useContext(AnimalSubTypesContext);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [addSubFieldToField, setAddSubFieldToField] = useState("");
  const [id, setId ] = useState<any>()
  const [editSubField, setEditSubField] = useState<SelectSubFieldModel>();
  const { t } = useTranslation("selectFields");
  const onAddSubField: AnimalsSubFieldsProps["onAdd"] = (selectField) => {
    setFormModal(true)
    setId(selectField)
  };
  const onEditSubField: AnimalsSubFieldsProps["onEdit"] = (item: any) => {
    setEditSubField(item);
    console.log(item)
    setFormModal(true);
  };
  const onDeleteSubField: AnimalsSubFieldsProps["onDelete"] = async (item: any) => {
    setLoading(true);
    animalSubTypeService.destroy(item._id)
    setLoading(false);
  };
  const handleAddOrEditSubField = async (values: any) => {
    setLoading(true);
    if (editSubField?._id) {
      animalSubTypeService.update(editSubField._id, values)
    } else {
     values.animalType = id
      animalSubTypeService.create(values)
    }
    setLoading(false);
    setFormModal(false);
  };

 
  return (
    <>
     <ModalForm
        title={t("Add")}
        visible={formModal}
        onCancel={() => {
          setFormModal(false);
          setEditSubField(undefined);
        }}
        onOk={handleAddOrEditSubField}
        initialValues={editSubField}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: t("Name is required!") }]}
        >
          <Input placeholder={t("Name")} />
        </Form.Item>
      </ModalForm>
    <Table
      className="select-fields-table"
      rowKey="_id"
      dataSource={data}
      scroll={{ y: height - 236 }}
      pagination={false}
      expandable={{
        expandedRowRender: (item: any) => (
          <AnimalsSubFields
            item={item}
            onAdd={onAddSubField}
            onEdit={onEditSubField}
            onDelete={onDeleteSubField}
           
          />
        ),
        expandRowByClick: true,
      }}
      columns={[
        {
          title: t("Name"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: "",
          dataIndex: "actions",
          key: "actions",
          render: (_value, row) => (
            <>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={() => onEdit(row)}
              />
              <Popconfirm
                title={t("Are you sure?")}
                onConfirm={() => onDelete(row)}
              >
                <Button icon={<DeleteOutlined />} danger ghost />
              </Popconfirm>
            </>
          ),
        },
      ]}
    />
    </>
  );
  
};

export default AnimalTypesList;

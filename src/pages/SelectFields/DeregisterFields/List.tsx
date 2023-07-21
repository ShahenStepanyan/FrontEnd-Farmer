import { useContext, useState } from "react";
import { Button, Popconfirm, Table, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModalForm from "../../../components/ModalForm";
import DeregisterSubFields from "./DeregisterSubFields";
import { SelectFieldsContext } from "../../../context/SelectFieldsContext";
import useScreenSize from "../../../hooks/useScreenSize";
import { useTranslation } from "react-i18next";
import "../styles.less";

import type {
  SelectFieldAndSubFields,
  SelectSubFieldModel,
} from "../../../types/SelectField";
import type { DeregisterSubFieldsProps } from "./DeregisterSubFields";
import Item from "antd/lib/list/Item";

type SelectFieldsListProps = {
  data: Array<SelectFieldAndSubFields>;
  onEdit: (item: SelectFieldAndSubFields) => void;
  onDelete: (item: SelectFieldAndSubFields) => void;
};

const DeathReasonsList = ({
  data,
  onEdit,
  onDelete,
}: SelectFieldsListProps) => {
  const { addSubField, removeSubField, updateSubField } =useContext(SelectFieldsContext);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [addSubFieldToField, setAddSubFieldToField] = useState("");
  const [editSubField, setEditSubField] = useState<SelectSubFieldModel>();
  const { height } = useScreenSize();
  const { t } = useTranslation("selectFields");

  const onAddSubField: DeregisterSubFieldsProps["onAdd"] = (selectField) => {
    setFormModal(true);
    setAddSubFieldToField(selectField);
  };
  const onEditSubField: DeregisterSubFieldsProps["onEdit"] = (item) => {
    setEditSubField(item);
    setFormModal(true);
  };
  const onDeleteSubField: DeregisterSubFieldsProps["onDelete"] = async (
    item
  ) => {
    setLoading(true);
    await removeSubField(item);
    setLoading(false);
  };
  
  const handleAddOrEditSubField = async (values: any) => {
    setLoading(true);
    if (editSubField?._id) {
      await updateSubField({ ...editSubField, ...values });
    } else {
      await addSubField({ selectField: addSubFieldToField, ...values });
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
        loading={loading}
        scroll={{ y: height - 236 }}
        pagination={false}
        expandable={{
          expandedRowRender: (item) => (
            <DeregisterSubFields
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row);
                  }}
                />
                <Popconfirm
                  title={t("Are you sure?")}
                  visible={deleteConfirmId === row._id}
                  onCancel={(e) => {
                    e?.stopPropagation();
                    setDeleteConfirmId("");
                  }}
                  onVisibleChange={(visible) =>
                    setDeleteConfirmId(visible ? row._id : "")
                  }
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    onDelete(row);
                  }}
                >
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    ghost
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(row._id);
                    }}
                  />
                </Popconfirm>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default DeathReasonsList;

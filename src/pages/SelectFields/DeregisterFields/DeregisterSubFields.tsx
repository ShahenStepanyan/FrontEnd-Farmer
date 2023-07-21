import { Popconfirm, Table } from "antd";
import { Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import type {
  SelectFieldAndSubFields,
  SelectSubFieldModel,
} from "../../../types/SelectField";

export type DeregisterSubFieldsProps = {
  item: SelectFieldAndSubFields;
  onAdd: (selectField: string) => void;
  onEdit: (item: SelectSubFieldModel) => void;
  onDelete: (item: SelectSubFieldModel) => void;
};

function DeregisterSubFields({
  item,
  onAdd,
  onEdit,
  onDelete,
}: DeregisterSubFieldsProps) {
  const { t } = useTranslation("selectFields");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{t("{{fieldName}} Sub Fields", { fieldName: item.name })}</h4>
        <Button
          onClick={() => onAdd(item._id)}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          {t("Add")}
        </Button>
      </div>
      <Table
        dataSource={item.subFields}
        rowKey="_id"
        pagination={false}
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
    </div>
  );
}

export default DeregisterSubFields;

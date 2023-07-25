import { Popconfirm, Table } from "antd";
import { Button } from "antd";
import { useEffect, useState } from "react";
import animalSubTypeService from "../../../services/animalSub";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { AnimalSubTypesModel } from "../../../types/AnimalSubTypes";
import type {
  SelectFieldAndSubFields,
  SelectSubFieldModel,
} from "../../../types/SelectField";

export type AnimalsSubFieldsProps = {
  item: SelectFieldAndSubFields;
  onAdd: (selectField: string) => void;
  onEdit: (item: SelectSubFieldModel) => void;
  onDelete: (item: SelectSubFieldModel) => void;
};

function AnimalsSubFields({
  item,
  onAdd,
  onEdit,
  onDelete,
}: AnimalsSubFieldsProps) {
  const [animalSubType, setAnimalSubType] = useState<AnimalSubTypesModel[]>();
  const { t } = useTranslation("selectFields");

  useEffect(() => {
    const result: any[] = [];
    animalSubTypeService.find().then((data) => {
      data.forEach((value) => {
        if (value.animalType === item._id) {
          result.push(value);
        }
      });
      setAnimalSubType(result);
    });
  }, [item._id, onAdd, onDelete, onEdit]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{t("{{fieldName}} Sub Fields", { fieldName: item.name })}</h4>
        <Button
          onClick={() => {
            onAdd(item._id);
          }}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          {t("Add")}
        </Button>
      </div>
      <Table
        dataSource={animalSubType}
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
            render: (_value, row: any) => (
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

export default AnimalsSubFields;

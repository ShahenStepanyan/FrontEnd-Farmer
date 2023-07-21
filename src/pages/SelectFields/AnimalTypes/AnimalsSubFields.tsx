import { Popconfirm, Table } from "antd";
import { Button } from "antd";
import { AnimalSubTypesContext } from "../../../context/AnimalSubContext";
import {useContext, useEffect, useState} from "react"
import animalSubTypeService from "../../../services/animalSub"
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";


export type AnimalsSubFieldsProps = {
  item: any;
  onAdd: (selectField: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};



function AnimalsSubFields({
  item,
  onAdd,
  onEdit,
  onDelete,
}: AnimalsSubFieldsProps) {
  const [animalSubType, setAnimalSubType] = useState<any>()
  const { t } = useTranslation("selectFields");


 
  useEffect(() => {
    const result: any[] = [];
    animalSubTypeService.find().then((data) => {
      data.map((value) => {
        if(value.animalType === item._id){
          result.push(value)
        }
        
      })
      setAnimalSubType(result)
    })
  }, [onAdd,onDelete,onEdit]);

  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{t("{{fieldName}} Sub Fields", { fieldName: item.name })}</h4>
        <Button
          onClick={() => {
            onAdd(item._id)
            // alert(item.name) 
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

export default AnimalsSubFields;

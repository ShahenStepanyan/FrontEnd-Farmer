import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import animalTypeService from "../../../services/animalTypes";
import { Animal } from "../../../types/Animal";
import "../style.less";
import { AnimalTypesModel } from "../../../types/AnimalTypes";
import { getAnimalsChildrens } from "../../../services/getAnimalsChildrens";

export default function Children() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [animalsType, setAnimalsType] = useState<AnimalTypesModel[]>([]);
  const [childCounts, setChildCounts] = useState<any>([]);

  useEffect(() => {
    animalTypeService.find().then(setAnimalsType);
  }, []);
  const handleChange = (item: string) => {
    getAnimalsChildrens({
      params: item,
    }).then((value: any) => {
      setAnimals(value.animals);
      setChildCounts(value);
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Count",
      dataIndex: "username",
      key: "username",
      sorter: (a: any, b: any) => a.username - b.username,
    },
    {
      title: "Children",
      dataIndex: "age",
      key: "age",
    },
  ];

  return (
    <>
      <div className="default-parametr">
        <h3>ChildrenByAnimalTypeTitle</h3>
        <Select
          onChange={handleChange}
          defaultValue="Animals"
          options={animalsType.map((item) => {
            return { value: item._id, label: item.name };
          })}
        />
        <Table
          pagination={false}
          dataSource={animals.map((item, index) => {
            return {
              key: Number(item.serialNumber),
              username: childCounts.childCounts?.[index]?.length,
              age: childCounts.childCounts?.[index]
                ?.map((value: any) => Number(value?.serialNumber))
                .join(","),
            };
          })}
          columns={columns}
        />
      </div>
    </>
  );
}

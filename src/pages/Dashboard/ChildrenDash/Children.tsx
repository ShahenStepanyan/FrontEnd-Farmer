import { Select, Table } from "antd";
import { useEffect, useState, useRef } from "react";
import animalsService from "../../../services/animals";
import animalTypeService from "../../../services/animalTypes";
import { AnimalModel } from "../../../types/Animal";
import { QueryProps } from "../../../types";
import { ObjectId } from "bson";
import { render } from "react-dom";
import Countdown from "antd/lib/statistic/Countdown";

export default function ChildrenComp() {
  const limit = 6;
  const [animals, setAnimals] = useState<any[]>([]);
  const [animalsType, setAnimalsType] = useState<any[]>([]);
  const [filters, setFilters] = useState<QueryProps<AnimalModel>>({});
  const [childrenCount, setChildrenCount] = useState<number[]>([]);
  const count = useRef<any>([]);
  const children = useRef<any>([]);

  useEffect(() => {
    animalTypeService.find().then(setAnimalsType);
  }, []);



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
  const handleChange = (value: string) => {
    count.current = [];
    animalsService
      .find({
        ...filters,
        limit,
        animalType: value,
      })
      .then((value) => {
        value.map((item, index) => {
          animalsService
            .find({ parent: item._id })
            .then((val) => count.current.push(val));
        });

        setTimeout(() => {
          setAnimals(value);
        }, 800);
        console.log(count.current);
      });
  };

  return (
    <>
      <div
        style={{
          width: "50%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
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
              username: count.current[index].length,
              age: count.current[index]
                .map((val: any) => Number(val.serialNumber))
                .join(","),
            };
          })}
          columns={columns}
        />
      </div>
    </>
  );
}

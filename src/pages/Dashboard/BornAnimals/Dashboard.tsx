import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Select } from "antd";
import moment from "moment";
import animalsService from "../../../services/animals";
import animalTypeService from "../../../services/animalTypes";
import type { AnimalTypes } from "../../../types/AnimalTypes";
import "../style.less";


const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

ChartJS.register(BarElement);



export default function Dashboard() {
 
  const [animalsType, setAnimalsType] = useState<AnimalTypes[]>([]);
  const [date, setDate] = useState<Object>({});

  useEffect(() => {
    animalTypeService.find().then(setAnimalsType);
  }, []);

  const handleChange = async (value: string) => {
    try {
      const items = await animalsService.find();
      const result: Array<string> = [];
  
      items.forEach((values) => {
        if (
          values.animalType === value 
        ) {
          result.push(moment(values.birthDate).format("MMM"));
        }
      });

      const count: Array<string> = [];
      for (let i = 0; i < months.length; i++) {
        const res: any = result.filter((month) => months[i] === month);
        count.push(res);
      }

      const dateData = months.reduce((acc: any, month, index) => {
        acc[month] = count[index].length;
        return acc;
      }, {});

      setDate(dateData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const chartData = {
    labels: Object.keys(date),
    datasets: [
      {
        label: "Animals",
        backgroundColor: "blue",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: Object.values(date),
        
      },
    ],

    
  };

  return (
    <>
      <div className="default-parametr">
        <span style={{ marginRight: "20px" }}>
          <strong>Animals Born</strong>
        </span>
        <Select
          defaultValue="Animals"
          options={animalsType?.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          onChange={handleChange}
        />

        <Bar data={chartData} />
      </div>
    </>
  );
}

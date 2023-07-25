import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import moment from "moment";
import { Chart as ChartJS, BarElement } from "chart.js";
import spendingsService from "../../../services/spendings";
import "../style.less";
ChartJS.register(BarElement);

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

export default function Spendings() {
  const [date, setDate] = useState<{ [key: string]: number }>({});

  const handleChange = (value: any): void => {
    const selectedYear: string = moment(value._d).format("YYYY");
    const count: number[] = Array(12).fill(0);

    spendingsService.find().then((items) => {
      items.forEach((values) => {
        const spendingYear = moment(values.date).format("YYYY");
        if (selectedYear === spendingYear) {
          const spendingMonth = moment(values.date).format("MMM");
          const index = months.indexOf(spendingMonth);
          if (index !== -1) {
            count[index] += Number(values.amount);
          }
        }
      });

      const updatedDate: { [key: string]: number } = {};
      months.forEach((month, index) => {
        updatedDate[month] = count[index];
      });

      setDate(updatedDate);
    });
  };

  const state = {
    labels: Object.keys(date),
    datasets: [
      {
        label: "Spendings",
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
        <DatePicker onChange={handleChange} picker="year" />
        <Bar data={state} />
      </div>
    </>
  );
}

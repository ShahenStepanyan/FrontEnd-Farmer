import React from "react";
import { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import animalsService from "../../../services/animals";
import moment from "moment"
import spendingsService from "../../../services/spendings";
import { Select, DatePicker, Form } from "antd";
import type { AnimalModel } from "../../../types/Animal";
import type { SpendingEventsType } from "../../../types/SpendingEventsType";


ChartJS.register(BarElement);
export default function SpendingsComp() {
  const [animals, setAnimals] = useState<AnimalModel[]>();
  const [spendingsType, setSpendingsType] = useState<SpendingEventsType[]>();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const [va, setVal] = useState<any[]>([])
 
  useEffect(() => {
    spendingsService.find().then(setSpendingsType);
  }, []);

  const [date, setDate] = useState<any>({})
  
  const state = {
    labels: Object.keys(date) ,
    datasets: [
      {
        label: 'Spendings',
        backgroundColor: 'red',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(date)
      }
    ]
  }

  const handleChange = (value: any) => {
    console.log(value)
     const test: any[] = []
      let result: any[] = [] 
      let save: any[] = []
      spendingsService.find().then((item) => {
        item.map((values) => {
          if(moment(value._d).format("YYYY") === moment(values.date).format("YYYY")){ 
              result.push(moment(values.date).format("MMM"))
              save.push(values.amount)
          }
        })
        setAnimals(result)
      
        for(let i = 0; i < months.length; i++){
          const res: any[] = []
          for(let g =0; g < result.length; g++){
            if(months[i] === result[g]){
              res.push(Number(save[g]))
            }
          }
         
          test.push(res.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
          
        }
        setVal(test)
        setDate({
          Jan: test[0],
          Feb: test[1],
          Mar: test[2],
          Apr: test[3],
          May: test[4],
          Jun: test[5],
          Jul: test[6],
          Aug: test[7],
          Sep: test[8],
          Oct: test[9],
          Nov: test[10],
          Dec: test[11] 
        })
      });
  }
    
  return (
    <>
    <div style={{width: "50%", marginLeft: "25px",textAlign: "right", backgroundColor: "white",padding: "20px", borderRadius: "15px"}}>
    {/* <Select 
      defaultValue="Animals"
      options={animalsType?.map((item) => {
        return {value: item._id, label: item.name}
      })}
      onChange={handleChange}
    /> */}
    <DatePicker  onChange={handleChange} picker="year" />
    <Bar
          data={state}   
        />
    </div>
    
    </>
  );
}
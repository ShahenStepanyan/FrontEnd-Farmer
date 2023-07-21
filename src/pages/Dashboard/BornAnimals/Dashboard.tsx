import React from "react";
import { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import animalsService from "../../../services/animals";
import moment from "moment"
import animalTypeService from "../../../services/animalTypes";
import { Select, DatePicker, Form } from "antd";
import type { AnimalModel } from "../../../types/Animal";
import type { AnimalTypes } from "../../../types/AnimalTypes";


ChartJS.register(BarElement);
export default function DashboardComp() {
  const [animals, setAnimals] = useState<AnimalModel[]>();
  const [animalsType, setAnimalsType] = useState<AnimalTypes[]>();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const [va, setVal] = useState<any[]>([])
 
  useEffect(() => {
    animalTypeService.find().then(setAnimalsType);
  }, []);

  const [date, setDate] = useState<any>({})
  
  const state = {
    labels: Object.keys(date) ,
    datasets: [
      {
        label: 'Animals',
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
      animalsService.find().then((item) => {
        item.map((values) => {
          // if(value._d === moment(values.birthDate).format("YYYY")){
            if(values.animalType === value || value._d === moment(values.birthDate).format("YYYY")){
              result.push(moment(values.birthDate).format("MMM"))
            }
          // }
        })
        setAnimals(result)
      
        for(let i = 0; i < months.length; i++){
          const res: any[] = []
          for(let g =0; g < result.length; g++){
            if(months[i] === result[g]){
              res.push(result[g])
            }
          }
          test.push(res)
          
        }
        setVal(test)
        setDate({
          Jan: test[0].length,
          Feb: test[1].length,
          Mar: test[2].length,
          Apr: test[3].length,
          May: test[4].length,
          Jun: test[5].length,
          Jul: test[6].length,
          Aug: test[7].length,
          Sep: test[8].length,
          Oct: test[9].length,
          Nov: test[10].length,
          Dec: test[11].length 
        })
      });
  }
  
  return (
    <>
    <div style={{width: "50%", backgroundColor: "white",padding: "20px", borderRadius: "15px"}}>
    <span style={{marginRight: "20px"}}><strong>Animals Born</strong></span>
    <Select 
      defaultValue="Animals"
      options={animalsType?.map((item) => {
        return {value: item._id, label: item.name}
      })}
      onChange={handleChange}
    />
  
    <Bar
          data={state}   
        />
    </div>
    
    </>
  );
}

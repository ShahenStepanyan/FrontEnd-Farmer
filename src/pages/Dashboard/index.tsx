import Dashboard from "../Dashboard/BornAnimals/Dashboard";
import Spendings from "./SpendingsDash/Spendings"
import AnimalsState from "./AnimalsState/AnimalsState";
import AnimalsSold from "./AnimalsState/AnimalsSold";
import Children from "./Children/Children";
import "./style.less";
function DashboardState() {
  return (
    <>
    <div className="table">
    <Dashboard/>
    <Spendings/>
    </div>
    <div className="table">
      <Children/>
      <AnimalsState/>
      <AnimalsSold/>
    </div>
     
    </>
  );
}

export default DashboardState;

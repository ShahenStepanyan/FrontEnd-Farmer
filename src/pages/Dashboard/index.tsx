import DashboardComp from "../Dashboard/BornAnimals/Dashboard";
import SpendingsComp from "../Dashboard/SpendingsDash/Spendings"
import AnimalsStateComp from "./AnimalsState/AnimalState";
import AnimalsSoldComp from "./AnimalsState/AnimalsSold";
import ChildrenComp from "./ChildrenDash/Children";

function Dashboard() {
  return (
    <>
    <div style={{display: "flex"}}>
    <DashboardComp/>
    <SpendingsComp/>
    </div>
    <div style={{display: "flex"}}>
      <ChildrenComp/>
      <AnimalsStateComp/>
      <AnimalsSoldComp/>
    </div>
     
    </>
  );
}

export default Dashboard;

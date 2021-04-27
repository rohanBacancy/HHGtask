import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import CounterTask from "./Components/CounterTask/CounterTask";
import EmployeeList from "./Components/EmployeesListTask/EmployeeList";

function App() {

  const [value, setValue] = useState(0); //value of tab menu
  let renderTask; //Conditionally render task

  const handleChange = (event, newValue) => { //Changing the index of tab on tab change
    setValue(newValue);
  };

  if(value === 0) //Which task to show based on it's index
  {
    renderTask = <CounterTask/>;
  }
  else if(value === 1)
  {
    renderTask = <EmployeeList/>;
  }
  

  return (
    <>
      <AppBar position="static">  {/* Tab Menu on top */}
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Counter Task" />
          <Tab label="Employees Task" />
        </Tabs>
      </AppBar>
      
      {renderTask} {/* Conditional checking of task */}
    </>
  );
}

export default App;

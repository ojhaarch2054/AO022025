import LeftSideBar from "./components/LeftSideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddChartForm from "./components/AddChartForm";
import ChartView from "./components/ChartView";
import { useState } from "react";
import { Sensor } from "./interfaces/sensorData";
import Error404Page from "./components/Error404Page";

function App() {
  //state to store data
  const [sensorData, setSensorData] = useState<Sensor[]>([
    
  ]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeftSideBar sensorData={sensorData} />} />
        <Route path="/add-chart" element={<AddChartForm />} />
        <Route
          path="/chart/:id"
          element={<ChartView sensorData={sensorData} chartIndex={null} />}
        />
        <Route path="*" element={<Error404Page/>} />
      </Routes>
    </Router>
  );
}

export default App;

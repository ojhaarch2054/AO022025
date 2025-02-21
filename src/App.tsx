import LeftSideBar from "./components/LeftSideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddChartForm from "./components/AddChartForm";
import ChartView from "./components/ChartView";
import { useState } from "react";
import { Sensor } from "./interfaces/sensorData";

function App() {
  //state to store data
  const [sensorData, setSensorData] = useState<Sensor[]>([
    {
      name: "Sensor_A",
      dataseries: [
        { value: 22.5, date: "2024-12-05T00:00:00Z" },
        { value: 23.0, date: "2024-12-06T00:00:00Z" },
        { value: 22.8, date: "2024-12-07T00:00:00Z" },
        { value: 21.9, date: "2024-12-08T00:00:00Z" },
        { value: 22.3, date: "2024-12-09T00:00:00Z" },
        { value: 22.7, date: "2024-12-10T00:00:00Z" },
        { value: 23.1, date: "2024-12-11T00:00:00Z" },
        { value: 22.6, date: "2024-12-12T00:00:00Z" },
        { value: 21.8, date: "2024-12-13T00:00:00Z" },
        { value: 22.0, date: "2024-12-14T00:00:00Z" },
      ],
    },
    {
      name: "Sensor_B",
      dataseries: [
        { value: 20.4, date: "2024-08-16T00:00:00Z" },
        { value: 21.1, date: "2024-08-17T00:00:00Z" },
        { value: 20.9, date: "2024-08-18T00:00:00Z" },
        { value: 21.3, date: "2024-08-19T00:00:00Z" },
        { value: 20.7, date: "2024-08-20T00:00:00Z" },
        { value: 21.5, date: "2024-08-21T00:00:00Z" },
        { value: 21.0, date: "2024-08-22T00:00:00Z" },
        { value: 20.8, date: "2024-08-23T00:00:00Z" },
        { value: 21.2, date: "2024-08-24T00:00:00Z" },
        { value: 20.6, date: "2024-08-25T00:00:00Z" },
      ],
    },
    {
      name: "Sensor_C",
      dataseries: [
        { value: 19.8, date: "2024-01-10T00:00:00Z" },
        { value: 19.5, date: "2024-01-11T00:00:00Z" },
        { value: 19.9, date: "2024-01-12T00:00:00Z" },
        { value: 19.7, date: "2024-01-13T00:00:00Z" },
        { value: 20.2, date: "2024-01-14T00:00:00Z" },
        { value: 20.0, date: "2024-01-15T00:00:00Z" },
        { value: 19.6, date: "2024-01-16T00:00:00Z" },
        { value: 20.1, date: "2024-01-17T00:00:00Z" },
        { value: 19.4, date: "2024-01-18T00:00:00Z" },
        { value: 19.8, date: "2024-01-19T00:00:00Z" },
      ],
    },
    {
      name: "Sensor_D",
      dataseries: [
        { value: 18.2, date: "2024-04-21T00:00:00Z" },
        { value: 18.7, date: "2024-04-22T00:00:00Z" },
        { value: 18.5, date: "2024-04-23T00:00:00Z" },
        { value: 18.3, date: "2024-04-24T00:00:00Z" },
        { value: 18.6, date: "2024-04-25T00:00:00Z" },
        { value: 18.9, date: "2024-04-26T00:00:00Z" },
        { value: 18.4, date: "2024-04-27T00:00:00Z" },
        { value: 18.1, date: "2024-04-28T00:00:00Z" },
        { value: 18.8, date: "2024-04-29T00:00:00Z" },
        { value: 18.3, date: "2024-04-30T00:00:00Z" },
      ],
    },
    {
      name: "Sensor_E",
      dataseries: [
        { value: 17.5, date: "2024-03-01T00:00:00Z" },
        { value: 17.2, date: "2024-03-02T00:00:00Z" },
        { value: 17.8, date: "2024-03-03T00:00:00Z" },
        { value: 17.4, date: "2024-03-04T00:00:00Z" },
        { value: 17.9, date: "2024-03-05T00:00:00Z" },
        { value: 17.6, date: "2024-03-06T00:00:00Z" },
        { value: 17.3, date: "2024-03-07T00:00:00Z" },
        { value: 17.7, date: "2024-03-08T00:00:00Z" },
        { value: 17.1, date: "2024-03-09T00:00:00Z" },
        { value: 17.4, date: "2024-03-10T00:00:00Z" },
      ],
    },
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
      </Routes>
    </Router>
  );
}

export default App;

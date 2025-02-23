import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddChartForm from "./components/AddChartForm";
import ChartView from "./components/ChartView";
import Error404Page from "./components/Error404Page";
import Navbar from "./components/NavBar";
import { useAppContext } from "./components/context/Context";


function App() {
  const {
 sensorData
  } = useAppContext();
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navbar sensorData={sensorData} />} />
      <Route path="/add-chart" element={<AddChartForm sensorToEdit={null} onClose={() => {}} />} />
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

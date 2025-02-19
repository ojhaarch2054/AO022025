import LeftSideBar from "./components/LeftSideBar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddChartForm from "./components/AddChartForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeftSideBar />} />
        <Route path="/add-chart" element={<AddChartForm />} />
      </Routes>
    </Router>
  );
}

export default App;
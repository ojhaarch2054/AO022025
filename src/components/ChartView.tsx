import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Sensor } from "../interfaces/sensorData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import "../CSS/chartViews.css";
import { useAppContext } from "./context/Context";

interface ChartViewProps {
  sensorData: Sensor[];
  chartIndex: number | null;
}

const ChartView = ({ sensorData, chartIndex }: ChartViewProps) => {
  const { setSensorData, formData , setFormData} = useAppContext();
  const [selectedDate, setSelectedDate] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  

  // Ensure chartIndex is within bounds
  const chartId = chartIndex !== null && chartIndex < sensorData.length ? chartIndex : 0;
  const sensor = sensorData[chartId];

  useEffect(() => {
    if (sensor && sensor.dataseries.length > 0) {
      const startDate = new Date(sensor.dataseries[0].date);
      const endDate = new Date(sensor.dataseries[sensor.dataseries.length - 1].date);
      setSelectedDate({ start: startDate, end: endDate });
    }
  }, [sensor]);

  const filteredData = sensor.dataseries.filter((data) => {
    const dataDate = new Date(data.date);
    return (
      (!selectedDate.start || dataDate >= selectedDate.start) &&
      (!selectedDate.end || dataDate <= selectedDate.end)
    );
  });

  const options = {
    title: {
      text: formData.name,
      align: "left",
    },
    xAxis: {
      title: {
        text: formData.xAxis,
      },
      categories: filteredData.map((data) => {
        const date = new Date(data.date);
        return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      }),
    },
    yAxis: {
      title: {
        text: formData.yAxis, 
      },
    },
    series: [
      {
        name: formData.textDescription,
        data: filteredData.map((data) => data.value),
        color: formData.color,
      },
    ],
  };

  return (
    <div className="chart-box">
      <div className="chart-header">
        <h2>{formData.name}</h2>
        <div className="date-picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={selectedDate.start}
              onChange={(newValue) => setSelectedDate((prev) => ({ ...prev, start: newValue }))}
            />
            <span> - </span>
            <DatePicker
              label="End Date"
              value={selectedDate.end}
              onChange={(newValue) => setSelectedDate((prev) => ({ ...prev, end: newValue }))}
            />
          </LocalizationProvider>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <p className="styled-p">{formData.textDescription}</p>
    </div>
  );
};

export default ChartView;

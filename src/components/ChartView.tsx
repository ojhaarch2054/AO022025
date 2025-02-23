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
  //destructuring context values
  const { setSensorData, formData, setFormData } = useAppContext();
  console.log("form data is here " + formData.name);
  //state to hold the selected date range for filtering the data
  const [selectedDate, setSelectedDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  //ensuring  chartIndex is within bounds and get the appropriate sensor data
  const chartId =
    chartIndex !== null && chartIndex < sensorData.length ? chartIndex : 0;
  const sensor = sensorData[chartId];

  useEffect(() => {
    console.log("Updated formData in ChartView:", formData);
  }, [formData]);

  //effect to set the initial date range based on the sensor data
  useEffect(() => {
    //check if sensor data exists and has data series
    if (sensor && sensor.dataseries.length > 0) {
      const startDate = new Date(sensor.dataseries[0].date);
      const endDate = new Date(
        sensor.dataseries[sensor.dataseries.length - 1].date
      );
      setSelectedDate({ start: startDate, end: endDate });
    }
  }, [sensor]);

  //filter the data series based on the selected date range
  const filteredData = sensor.dataseries.filter((data) => {
    //convert the data entry date to a Date obj
    const dataDate = new Date(data.date);
    return (
      //check if the date is after the start date
      (!selectedDate.start || dataDate >= selectedDate.start) &&
      //check if the date is before the end date
      (!selectedDate.end || dataDate <= selectedDate.end)
    );
  });

  //options for highcharts chart
  const options = {
    title: {
      text: sensor.name,
      align: "left",
    },
    xAxis: {
      title: {
        text: sensor.xAxis,
      },
      categories: filteredData.map((data) => {
        const date = new Date(data.date);
        return `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      }),
    },
    yAxis: {
      title: {
        text: sensor.yAxis,
      },
    },
    series: [
      {
        name: sensor.textDescription,
        data: filteredData.map((data) => data.value),
        color: sensor.color,
      },
    ],
  };
  console.log("sensor name " + sensor.name);
  console.log("Title text:", options.title.text);

  return (
    <div className="chart-box">
      <div className="chart-header">
        <h2>{options.title.text}</h2>
        <div className="date-picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={selectedDate.start}
              onChange={(newValue) =>
                setSelectedDate((prev) => ({ ...prev, start: newValue }))
              }
            />
            <span> - </span>
            <DatePicker
              label="End Date"
              value={selectedDate.end}
              onChange={(newValue) =>
                setSelectedDate((prev) => ({ ...prev, end: newValue }))
              }
            />
          </LocalizationProvider>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <p className="styled-p">{sensor.textDescription}</p>
    </div>
  );
};

export default ChartView;

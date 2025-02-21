import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Sensor } from "../interfaces/sensorData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import "../CSS/chartViews.css";
import { Typography } from "@mui/material";


interface ChartViewProps {
  sensorData: Sensor[];
  chartIndex: number | null;
}
const ChartView = ({ sensorData, chartIndex }: ChartViewProps) => {
  //state variable with initial value of null
  //select date will hold current selected date
  const [selectedDate, setSelectedDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  //parsing the id parameter to an integer default is 0 if id is not present
  const chartId = chartIndex !== null ? chartIndex : 0;
  //getting the sensor data
  //chartId is used as an index to access the specific sensor data from the sensorData array
  const sensor = sensorData[chartId];

  //set the selected date to the first date in the sensor data series when the chart is opened
  useEffect(() => {
    if (sensor.dataseries.length > 0) {
      const startDate = new Date(sensor.dataseries[0].date);
      const endDate = new Date(
        sensor.dataseries[sensor.dataseries.length - 1].date
      );
      setSelectedDate({ start: startDate, end: endDate });
    }
  }, [sensor]);

  //defining the options for the Highcharts chart
  const options = {
    title: {
      //set the chart title to the chart name which is clicked
      text: `Chart ${chartId + 1670 + 1}`,
      align: "left",
    },
    xAxis: {
      categories: sensor.dataseries.map((data) => {
        //create new date obj from data's date strng
        const date = new Date(data.date);
        //extract the day from the date
        const day = date.getDate().toString().padStart(2, "0");
        //extract month from the date
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        //extract year from the date
        const year = date.getFullYear();
        //return the formatted date
        return `${day}/${month}/${year}`;
      },
    )
    },
    yAxis: {
      title: {
        text: "Progress",
      },
    },
    series: [
      {
        //set the series name to "Time"
        name: "Time",
        //set the series data to the values from the sensor data series
        data: sensor.dataseries.map((data) => data.value),
      },
    ],
  };

  return (
    <div>
        <>
      <div className="right-corner">
        {/*localizationProvider is used to provide the date adapter for the DatePicker component */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/*datePicker component for selecting a date period */}
          <DatePicker
            label="Start Period"
            value={selectedDate.start}
            onChange={(newValue) =>
              setSelectedDate((prev) => ({ ...prev, start: newValue }))
            }
            slotProps={{ textField: { variant: "outlined" } }}
          />
          <DatePicker
            label="End Period"
            value={selectedDate.end}
            onChange={(newValue) =>
              setSelectedDate((prev) => ({ ...prev, end: newValue }))
            }
            slotProps={{ textField: { variant: "outlined" } }}
          />
        </LocalizationProvider>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />

      <div className="styled-div">
        <p className="styled-p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ea
          inventore dolore voluptas laudantium, maiores odit veritatis soluta
          vel sit doloribus exercitationem minima impedit accusamus sunt
          aspernatur harum cumque? Distinctio.
        </p>
      </div>
      </>
      )
    </div>
  );
};

export default ChartView;

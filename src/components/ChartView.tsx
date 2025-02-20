import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom";
import { Sensor } from "../interfaces/sensorData";
import { TextField, InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface ChartViewProps {
    sensorData: Sensor[];
    chartIndex: number | null;
  }
const ChartView = ({ sensorData, chartIndex }: ChartViewProps) => {
    //state variable with initial value of null
    //select date will hold current selected date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  //parsing the id parameter to an integer default is 0 if id is not present
  const chartId = chartIndex !== null ? chartIndex : 0;
  //getting the sensor data
  //chartId is used as an index to access the specific sensor data from the sensorData array
  const sensor = sensorData[chartId];
  
  //defining the options for the Highcharts chart
  const options = {
    title: {
      //set the chart title to the chart name which is clicked
      text: `Chart ${chartId + 1670 + 1}`,
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
      }),
    },
    yAxis: {
      title: {
        text: "progress",
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
      {/*localizationProvider is used to provide the date adapter for the DatePicker component */}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/*datePicker component for selecting a date period */}

        <DatePicker
          label="Period"
          value={selectedDate}
          onChange={(newValue) => {
            //update the selected date when a new date is chosen

            setSelectedDate(newValue);
          }}
          slots={{
            //customize the TextField used by the DatePicker
            textField: (params) => (
              <TextField
                {...params}
                required
                slotProps={{
                  input: {
                    //calendar icon at the end of the txtfield
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            ),
          }}
        />
      </LocalizationProvider>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartView;

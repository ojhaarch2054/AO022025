import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./context/Context";
import jsonDataToRead from "../dataSeries.json";

//interface for data series
interface DataSeries {
  value: number;
  date: string;
}
//interface for json data
interface JsonData {
  name: string;
  dataseries: DataSeries[];
}
//interface for sensordata
interface SensorData {
  name: string;
  chartType: string;
  color: string;
  dataseries: DataSeries[];
  textDescription: string;
  xAxis: string;
  yAxis: string;
}

const AddChartForm = () => {
  const navigate = useNavigate();
  const { setSensorData, formData, setFormData } = useAppContext();
  const [jsonData, setJsonData] = useState<JsonData[]>([]);

  //fetch data from JSON file
  useEffect(() => {
    setJsonData(jsonDataToRead);
  }, []);

  const options = ["Line", "Option 2"];
  const colors = ["Black", "Red", "Blue"];
  const dataseriesOption = jsonData.map((data) => data.name);

  //handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //destructure formData to extract individual fields
    const {
      name,
      chartType,
      color,
      dataseries,
      textDescription,
      xAxis,
      yAxis,
    } = formData;

    //find the actual data series from jsonDataToRead
    const selectedSeries =
      jsonData.find((data) => data.name === dataseries)?.dataseries || [];

    //check if all required fields are filled
    if (
      !name ||
      !chartType ||
      !color ||
      !dataseries ||
      !textDescription ||
      !xAxis ||
      !yAxis
    ) {
      alert("All Fields Are Required");
      return;
    }

    const newData: SensorData = {
      name,
      chartType,
      color,
      dataseries: selectedSeries,
      textDescription,
      xAxis,
      yAxis,
    };

    setSensorData((prev: any) => [...prev, newData]);

    alert(`New data "${formData.name}" added`);
    console.log("Details Added", newData);

    //reset form fields
    setFormData({
      name: "",
      chartType: "",
      color: "",
      dataseries: "",
      textDescription: "",
      xAxis: "",
      yAxis: "",
    });

    navigate("/");
  };

  //handle input change for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //handle cancel button click
  const cancelClick = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card sx={{ minWidth: 320, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography>Add Chart</Typography>

            <TextField
              placeholder="Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ width: 300 }}
            />

            {/*chart type */}
            <Autocomplete
              value={formData.chartType}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, chartType: newValue || "" }))
              }
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Chart Type *" />
              )}
            />

            {/*color picker */}
            <Autocomplete
              value={formData.color}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, color: newValue || "" }))
              }
              options={colors}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Color *" />
              )}
            />

            {/*dataseries picker */}
            <Autocomplete
              value={formData.dataseries}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, dataseries: newValue || "" }))
              }
              options={dataseriesOption}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Dataseries *" />
              )}
            />

            {/*xaxis & yaxis */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="X-axis name"
                name="xAxis"
                value={formData.xAxis}
                onChange={handleChange}
                sx={{ width: 140 }}
              />
              <TextField
                label="Y-axis name"
                name="yAxis"
                value={formData.yAxis}
                onChange={handleChange}
                sx={{ width: 140 }}
              />
            </Box>

            {/*text description */}
            <TextField
              label="Text description"
              name="textDescription"
              value={formData.textDescription}
              onChange={handleChange}
              sx={{ width: 300 }}
            />

            {/*buttons*/}
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button onClick={cancelClick} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                ADD CHART
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddChartForm;

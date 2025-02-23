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
import { Sensor } from "../interfaces/sensorData";

//interface for data series
interface DataSeries {
  value: number;
  date: string;
}
//interface for JSON data
interface JsonData {
  name: string;
  dataseries: DataSeries[];
}
interface AddChartFormProps {
  sensorToEdit: Sensor | null;
  onClose: () => void;
}
const AddChartForm = ({ sensorToEdit, onClose }: AddChartFormProps) => {
  const navigate = useNavigate();
  const { setSensorData, formData, setFormData} = useAppContext();
  const [jsonData, setJsonData] = useState<JsonData[]>([]);

  //to fetch data from JSON file
  useEffect(() => {
    setJsonData(jsonDataToRead);
  }, []);

  //initialize formData based on sensorToEdit
  useEffect(() => {
    if (sensorToEdit) {
      setFormData({
        name: sensorToEdit.name || "",
        chartType: sensorToEdit.chartType || "",
        color: sensorToEdit.color || "",
        dataseries: sensorToEdit.dataseries ? sensorToEdit.name : "",
        textDescription: sensorToEdit.textDescription || "",
        xAxis: sensorToEdit.xAxis || "",
        yAxis: sensorToEdit.yAxis || "",
      });
    }
    console.log("sensorToEdit updated:", sensorToEdit);
  }, [sensorToEdit, setFormData]);

  const options = ["Line", "Option 2"];
  const colors = ["Black", "Red", "Blue"];
  const dataseriesOption = jsonData.map((data) => data.name);

  //handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //destructuring form data to extract value
    const {
      name,
      chartType,
      color,
      dataseries,
      textDescription,
      xAxis,
      yAxis,
    } = formData;
    
    //find the actual data series by matching the selected name from jsonData
    const selectedSeries =
      jsonData.find((data) => data.name === dataseries)?.dataseries || [];

    //check if any required field is empty
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
    //create a new Sensor object with the provided data
    const newData: Sensor = {
      name,
      chartType,
      color,
      dataseries: selectedSeries,
      textDescription,
      xAxis,
      yAxis,
    };
    //check if we are editing an existing sensor
    if (sensorToEdit) {
      //update the existing sensor data in the state
      setSensorData((prev: any) =>
        prev.map((item: Sensor) =>
          item.name === sensorToEdit.name ? newData : item
        )
      );
      alert(`Sensor "${formData.name}" updated`);
    } else {
      //add the new sensor data to the state
      setSensorData((prev: any) => [...prev, newData]);
      alert(`New sensor "${formData.name}" added`);
    }

    console.log("Details Added/Updated", newData);
    //reset form data to clear input fields
    setFormData({
      name: "",
      chartType: "",
      color: "",
      dataseries: "",
      textDescription: "",
      xAxis: "",
      yAxis: "",
    });
    //close dialog
    onClose();
    navigate("/")
  };

  //handle input change for txt field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //to handle cancel click
  const cancelClick = () => {
    console.log("Cancel button clicked");
    onClose();
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
            <Typography>
              {sensorToEdit ? "Edit Sensor" : "Add Chart"}
            </Typography>
            <TextField
              placeholder="Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ width: 300 }}
            />
            {/*chart type*/}
            <Autocomplete
              value={formData.chartType}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, chartType: newValue || "" }))
              }
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Chart Type *" />
              )}
            />
            {/*color picker*/}
            <Autocomplete
              value={formData.color}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, color: newValue || "" }))
              }
              options={colors}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Color *" />
              )}
            />
            {/*dataseries picker*/}
            <Autocomplete
              value={formData.dataseries}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, dataseries: newValue || "" }))
              }
              options={dataseriesOption}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Dataseries *" />
              )}
            />
            {/*X-axis & Y-axis*/}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                placeholder="X-axis name"
                name="xAxis"
                value={formData.xAxis}
                onChange={handleChange}
                sx={{ width: 140 }}
              />
              <TextField
                placeholder="Y-axis name"
                name="yAxis"
                value={formData.yAxis}
                onChange={handleChange}
                sx={{ width: 140 }}
              />
            </Box>
            {/*txt description*/}
            <TextField
              placeholder="Text description"
              name="textDescription"
              value={formData.textDescription}
              onChange={handleChange}
              sx={{ width: 300 }}
            />
            {/*cancel and add btn */}
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button onClick={cancelClick} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {sensorToEdit ? "Update Sensor" : "Add Chart"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddChartForm;

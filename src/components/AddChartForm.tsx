import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddChartForm = () => {
  //use useNavigate
  const navigate = useNavigate();
  //options for autocomplete
  const options = ["Line", "Option 2"];
  //option for colors
  const colors = ["Black", "Red", "Blue"];
  //dataseries option
  const dataseriesOption = ["Dataseries", "DataSeries1"];
  //state for form data input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  //state for autocomplete value
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState("");
  //for colors
  const [colorValue, setColorValue] = useState<string | null>(colors[0]);
  const [inputColorValue, setInputColorValue] = useState("");
  //for dataSeries
  const [dataSeries, setDataSeries] = useState<string | null>(
    dataseriesOption[0]
  );
  const [inputDataSeriesValue, setInputDataSeriesValue] = useState("");
  //for text description
  const [textDescription, setTextDescription] = useState<String>("");

  //for axis
  const [xAxis, setXAxis] = useState<string>("");
  const [yAxis, setYAxis] = useState<string>("");

  //handle form submission
  const handleSubmit = (e: any) => {
    if (
      !inputValue ||
      !inputColorValue ||
      !inputDataSeriesValue ||
      !textDescription ||
      !xAxis ||
      yAxis
    ) {
      alert("All Fields Are Required");
    }
    e.preventDefault();
    console.log("Details Added");
    navigate("/");
  };

  //handle input change for text field
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //for cancelClick
  const cancleClick = () => {
    console.log("cancel btn clicked..");
    navigate("/");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography>Add Chart</Typography>
          {/*text field for name input */}
          <TextField
            placeholder="Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ width: 300 }}
          />

          {/*autocomplete component */}
          <Autocomplete
            value={value}
            onChange={(e: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Controllable *" />
            )}
          />

          {/*autocomplete component for color */}
          <Autocomplete
            value={colorValue}
            onChange={(e: any, newValue: string | null) => {
              setColorValue(newValue);
            }}
            inputValue={inputColorValue}
            onInputChange={(e, newInputValue) => {
              setInputColorValue(newInputValue);
            }}
            id="color-states-demo"
            options={colors}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Color *" />}
          />
          {/*autocomplete component for dataseries */}
          <Autocomplete
            value={dataSeries}
            onChange={(e: any, newValue: string | null) => {
              setDataSeries(newValue);
            }}
            inputValue={inputDataSeriesValue}
            onInputChange={(e, newInputValue) => {
              setInputDataSeriesValue(newInputValue);
            }}
            id="color-states-demo"
            options={dataseriesOption}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Dataseries *" />
            )}
          />
          {/*input field for axis*/}
          <Box>
            <TextField
              id="outlined-controlled"
              label="X-axis name"
              value={xAxis}
              onChange={(e: any) => {
                setXAxis(e.target.value);
              }}
              sx={{ marginRight: 1, width: 149 }}
            />
            <TextField
              id="outlined-controlled"
              label="Y-axis name"
              value={yAxis}
              onChange={(e: any) => {
                setYAxis(e.target.value);
              }}
              sx={{ width: 144 }}
            />
          </Box>
          {/*input field for text description*/}
          <TextField
            id="outlined-controlled"
            label="Text description"
            value={textDescription}
            onChange={(e: any) => {
              setTextDescription(e.target.value);
            }}
            sx={{ width: 300 }}
          />
          {/*cancel btn*/}
          <Box>
            <Button onClick={cancleClick}>Cancel</Button>
            {/*add btn*/}
            <Button type="submit">ADD CHART</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddChartForm;

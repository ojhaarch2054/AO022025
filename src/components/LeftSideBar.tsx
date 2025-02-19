import {
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemIcon,
    InputAdornment
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import Drawer from "@mui/material/Drawer";
  import CssBaseline from "@mui/material/CssBaseline";
  import { useState } from "react";
  import { Sensor } from "../interfaces/sensorData";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import SearchIcon from "@mui/icons-material/Search";
  import "../CSS/leftSideBar.css"
  import { useNavigate } from "react-router-dom";

  
  //define drawerWidth constant
  const drawerWidth = 240;
  
  const LeftSideBar = () => {
     //use useNavigate
     const navigate = useNavigate();
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
   
    //state to add new data when btn clicked
    //const[newSensorData, setNewSensorData] = useState()
  
    //onClick event for icon
    const handleMoreVertIconClick = () => {
      console.log("MoreVertIcon Clicked!!!!");
     
    };

    const addClickBtn = (e: any) => {
        e.preventDefault();
        navigate("/add-chart");
    }
  
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Typography
              sx={{ marginBottom: 2, marginTop: 5, textAlign: "center" }}
            >
              Logoipsum
            </Typography>
            {/*For input search field*/}
            <Box sx={{ margin:2 }}>
              <TextField
                placeholder="Search..."
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ width: '100%' }}
              />
            </Box>
  
            {/*For add chart btn*/}
            <Box>
              <Button variant="contained" sx={{marginLeft: 5, marginTop: 2, marginBottom:2}} onClick={addClickBtn}>+ Add Chart</Button>
            </Box>
  
            {/*For list of sensor data*/}
            <Box>
              <List>
                {sensorData.map((sensor, i) => (
                  <ListItem key={sensor.name}>
                    {`Chart ${i + 1}`}
                    <ListItemIcon className="list-item-icon">
                      <MoreVertIcon onClick={() => handleMoreVertIconClick} />
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Box>
      </>
    );
  };
  
  export default LeftSideBar;
  
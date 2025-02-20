import {
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemIcon,
    InputAdornment,
    Menu,
    MenuItem,
    Toolbar,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import Drawer from "@mui/material/Drawer";
  import CssBaseline from "@mui/material/CssBaseline";
  import { useState } from "react";
  import { Sensor } from "../interfaces/sensorData";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import SearchIcon from "@mui/icons-material/Search";
  import "../CSS/leftSideBar.css";
  import { useNavigate } from "react-router-dom";
  import ModeEditIcon from "@mui/icons-material/ModeEdit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import ChartView from "./ChartView";
  
  //define drawerWidth constant
  const drawerWidth = 240;
  
  const LeftSideBar = ({ sensorData }: { sensorData: Sensor[] }) => {
    //use useNavigate
    const navigate = useNavigate();
    //state for chartClick
    const [chartClicked, setChartClicked] = useState(false);
    const [clickedChartIndex, setClickedChartIndex] = useState<number | null>(null);
  
    //state manage the anchor element for the Menu component
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    //onClick event for icon
    const handleMoreVertIconClick = (e: any) => {
      console.log("MoreVertIcon Clicked!!!!");
      setAnchorEl(e.currentTarget);
    };
  
    const addClickBtn = (e: any) => {
      e.preventDefault();
      navigate("/add-chart");
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    //handleChartClick
    const handleChartClick = (i: number) => {
      setChartClicked(true);
      setClickedChartIndex(i);
    };
  
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
            <Box sx={{ margin: 2 }}>
              <TextField
                placeholder="Search..."
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "100%" }}
              />
            </Box>
            {/*For add chart btn*/}
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                marginLeft: 1.5,
                marginRight: 1.5,
              }}
              onClick={addClickBtn}
            >
              + Add Chart
            </Button>
            {/*For list of sensor data*/}
            <Box>
              <List>
                {sensorData.map((sensor, i) => (
                  <ListItem
                    key={sensor.name}
                    onClick={() => handleChartClick(i)}
                    className="listItemss"
                  >
                    {`Chart ${i + 1670 + 1}`}
                    <ListItemIcon>
                      <MoreVertIcon
                        onClick={handleMoreVertIconClick}
                        sx={{ marginLeft: 12 }}
                      />
                    </ListItemIcon>
                    {/*menu component to show dropsown menus */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {/*Edit and delete option */}
                      <MenuItem onClick={handleClose}>
                        <ModeEditIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <DeleteIcon />
                        Delete
                      </MenuItem>
                    </Menu>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
         
          {chartClicked ? (
            //if chartclicked is true it shows the chartView component
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
              <Toolbar />
              <ChartView sensorData={sensorData} chartIndex={clickedChartIndex} />
            </Box>
          ) : (
            //if chartClicked is false
            <Typography variant="h6" component="h6">add here</Typography>
          )}
        </Box>
      </>
    );
  };
  
  export default LeftSideBar;
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
  Dialog
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Sensor } from "../interfaces/sensorData";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "../CSS/leftSideBar.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChartView from "./ChartView";
import { useNavigate } from "react-router-dom";
import AddChartForm from "./AddChartForm";

//define drawerWidth constant
const drawerWidth = 240;

const LeftSideBar = ({ sensorData }: { sensorData: Sensor[] }) => {
    //to navigate
   const navigate = useNavigate()
  //state for chartClick
  const [chartClicked, setChartClicked] = useState(false);
  //state to keep track of the index of the clicked chart
  //clickedChart holds the index of the clicked chart which is initially null
  const [clickedChartIndex, setClickedChartIndex] = useState<number | null>(
    null
  );
  //state manage the anchor element for the Menu component
  //useful for controlling the position of the Menu component, allowing it to be displayed relative to the specified anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  //for dialog visibility
  const [openEditDialog, setOpenEditDialog] = useState(false);

  //onClick event for icon
  const handleMoreVertIconClick = (e: any) => {
    console.log("MoreVertIcon Clicked!!!!");
    setAnchorEl(e.currentTarget);
  };
  //to add chart
  const addClickBtn = (e: any) => {
    e.preventDefault();
    navigate("/add-chart");
  };

  //fun to handle the closing of the menu component
  //it closes the Menu by removing the reference to the anchor element
  const handleClose = () => {
    setAnchorEl(null);
  };

  //handleChartClick btn which takes the index of the clicked chart as an argument
  const handleChartClick = (i: number) => {
    setChartClicked(true);
    //update the clickedChartIndex state with the index of the clicked chart
    setClickedChartIndex(i);
    console.log("clicked chart index is: " + clickedChartIndex);
  };
  
//handle edit
const handleEditItem = () => {
    setOpenEditDialog(true);
    
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
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
                    <MenuItem onClick={handleEditItem}>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
              marginLeft: 47,
            }}
          >
            <Typography variant="h3">Welcome To Logoipsum</Typography>
          </Box>
        )}
      </Box>
      {/*To show the dialog when the edit menu clicked */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <AddChartForm/>
      </Dialog>
    </>
  );
};

export default LeftSideBar;

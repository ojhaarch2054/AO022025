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
  Dialog,
  IconButton,
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
import useMediaQuery from "@mui/material/useMediaQuery";

//define drawerWidth
const drawerWidth = 240;

const LeftSideBar = ({ sensorData }: { sensorData: Sensor[] }) => {
  //to navigate
  const navigate = useNavigate();
  //state for chartClick
  const [chartClicked, setChartClicked] = useState(false);
  //state to keep track of the index of the clicked chart
  const [clickedChartIndex, setClickedChartIndex] = useState<number | null>(
    null
  );
  //state to manage the anchor element for the Menu component
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //state to keep track of the index of the chart whose menu is open
  const [menuChartIndex, setMenuChartIndex] = useState<number | null>(null);
  //for dialog visibility
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //use media query to check if the screen is small
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  //state for the search term in mobile device
  const [searchTerm, setSearchTerm] = useState("");
  //state for the search dialog
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  //onClick event for icon
  const handleMoreVertIconClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.stopPropagation(); //prevent the click event from bubbling up
    setAnchorEl(e.currentTarget); //set the anchor for the menu
    setMenuChartIndex(index); //set the index of the chart whose menu is open
  };

  //to add chart
  const addClickBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate("/add-chart");
  };

  //handle the closing of the menu component
  const handleClose = () => {
    setAnchorEl(null);
    setMenuChartIndex(null); //reset the menu index when closing the menu
  };

  //handleChartClick btn which takes the index of the clicked chart as an argument
  const handleChartClick = (i: number) => {
    setChartClicked(true);
    //update the clickedChartIndex state with the index of the clicked chart
    setClickedChartIndex(i);
    console.log("clicked chart index is: " + i); //log the clicked index directly
  };

  //handle edit
  const handleEditItem = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  //for search icon in mobile
  const searchClick = () => {
    console.log("searchIcon clicked yayyy!!");
    setOpenSearchDialog(true);
  };
  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
    setSearchTerm("");
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/*check if the screen is small or not */}
        {!isSmallScreen && (
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
            <Box>
              <Typography
                sx={{ marginBottom: 2, marginTop: 5, textAlign: "center" }}
              >
                Logoipsum
              </Typography>
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
                sx={{
                  width: "100%",
                  borderRadius: 1,
                }}
              />
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
              {/* for list of sensor data */}
              <Box>
                {sensorData.length === 0 ? (
                  <Typography sx={{ textAlign: "center", marginTop: 2 }}>
                    No charts
                  </Typography>
                ) : (
                  <List>
                    {sensorData.map((sensor, i) => (
                      <ListItem
                        key={sensor.name}
                        onClick={() => handleChartClick(i)} // chart click handler
                        className="listItemss"
                      >
                        {`Chart ${i + 1670 + 1}`}
                        <ListItemIcon>
                          <MoreVertIcon
                            onClick={(e) => handleMoreVertIconClick(e, i)} // pass index when opening menu
                            sx={{ marginLeft: 12 }}
                          />
                        </ListItemIcon>
                        {/* menu component to show dropdown menu */}
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && menuChartIndex === i} // show menu only if it's the correct index
                          onClose={handleClose}
                        >
                          {/* edit and delete option */}
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
                )}
              </Box>
            </Box>
          </Drawer>
        )}

        {isSmallScreen ? (
          //for mobile view
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "100%",
            }}
          >
            {/*top bar with logo and search field */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <Typography variant="h6" align="left">
                Logoipsum
              </Typography>
              <IconButton onClick={searchClick}>
                <SearchIcon />
              </IconButton>
            </Box>
            {/*chart list */}
            {!chartClicked ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflowY: "auto",
                  width: "100%",
                }}
              >
                {sensorData.length === 0 ? (
                  <Typography sx={{ textAlign: "center", marginTop: 2 }}>
                    No charts
                  </Typography>
                ) : (
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
                            onClick={(e) => handleMoreVertIconClick(e, i)}
                            sx={{ marginLeft: 12 }}
                          />
                        </ListItemIcon>
                        {/*menu component to show dropdown menu */}
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && menuChartIndex === i} //show menu only if it's the correct index
                          onClose={handleClose}
                        >
                          {/*edit and delete option */}
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
                )}
              </Box>
            ) : (
              //if a chart is clicked show only the top bar and the selected chart
              <Box sx={{ flexGrow: 1 }}>
                <ChartView
                  sensorData={sensorData}
                  chartIndex={clickedChartIndex}
                />
              </Box>
            )}
            {/*for add chart button */}
            <Box sx={{ padding: 2 }}>
              <Button
                variant="contained"
                onClick={addClickBtn}
                sx={{ width: "75%", position: "absolute", bottom: 105 }}
              >
                + Add Chart
              </Button>
            </Box>
          </Box>
        ) : null}

        {chartClicked && !isSmallScreen ? (
          //if chartClicked is true and not mobile, show the ChartView component
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <ChartView sensorData={sensorData} chartIndex={clickedChartIndex} />
          </Box>
        ) : sensorData.length > 0 ? (
          //if chartClicked is false
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              marginLeft: { xs: 0, md: 47 },
            }}
          ></Box>
        ) : (
          //if no sensorData is available
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
              padding: 2,
              boxSizing: "border-box",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "gray",
                marginBottom: 4,
              }}
            >
              No charts created yet
            </Typography>
            <Button variant="contained" onClick={addClickBtn}>
              + Add Chart
            </Button>
          </Box>
        )}

        {/*to show the dialog when the edit menu is clicked */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <AddChartForm />
        </Dialog>
        {/*dialog for search */}
        <Dialog open={openSearchDialog} onClose={handleSearchDialogClose}>
          <Box sx={{ padding: 2 }}>
            <TextField
              autoFocus
              placeholder="Search"
              type="text"
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default LeftSideBar;

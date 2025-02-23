import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Dialog,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "./context/Context";
import { Sensor } from "../interfaces/sensorData";
import AddChartForm from "./AddChartForm";
//type for props
interface LeftSideBarProps {
  sensorData: Sensor[];
}
const LeftSideBar: React.FC<LeftSideBarProps> = ({ sensorData }) => {
  //destructuring context value
  const {
    anchorEl,
    setAnchorEl,
    menuChartIndex,
    setMenuChartIndex,
    setClickedChartIndex,
    setChartClicked,
  } = useAppContext();

  //to hold the currently selected sensor for editing
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  //to control whether the dialog is open or closed
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //to close the menu and reset its state
  const handleClose = () => {
    setAnchorEl(null);
    setMenuChartIndex(null);
  };
  //to handle click on the charts in the list
  const handleChartClick = (i: number) => {
    setChartClicked(true);
    setClickedChartIndex(i); //store the clicked chart index
    handleClose();
  };
  //to handle clicks on the menu icon
  const handleMenuIconClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    //prevent the list item click from firing
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuChartIndex(index);
  };
  //to open the edit dialog for a selected sensor
  const handleEditItem = (sensor: Sensor) => {
    //set the selected sensor for editing
    setSelectedSensor(sensor);
    //open the dialog
    setIsDialogOpen(true);
    handleClose();
  };
  //to close the edit dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedSensor(null);
  };
  //to handle the delete action
  const dltClick = () => {
    alert("Do you want to delete??");
    console.log("delete Icon clicked!!");
  };
  return (
    <>
      {/*list of sensors */}
      <List>
        {/*check if there are any sensors, if not show a message */}
        {sensorData.length === 0 ? (
          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            No charts
          </Typography>
        ) : (
          //map through each sensor to create alist
          sensorData.map((sensor, i) => (
            <ListItem
              sx={{ textAlign: "center", marginLeft: 3, cursor: "pointer" }}
              key={i}
              onClick={() => handleChartClick(i)}
            >
              {`Chart ${i + 1670 + 1}`}
              <ListItemIcon>
                <MoreVertIcon
                  onClick={(e: any) => handleMenuIconClick(e, i)}
                  sx={{ marginLeft: 12 }}
                />
              </ListItemIcon>
              {/*menu for edit and delete options */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuChartIndex === i}
                onClose={handleClose}
              >
                {/*menu item for editing */}
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditItem(sensor);
                  }}
                >
                  <ModeEditIcon />
                  Edit
                </MenuItem>
                {/*menu item for deleting */}
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    setSelectedSensor(sensor);
                    dltClick();
                  }}
                >
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </Menu>
            </ListItem>
          ))
        )}
      </List>
      {/*dialog for editing a chart */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <AddChartForm
          sensorToEdit={selectedSensor}
          onClose={handleDialogClose}
        />
      </Dialog>
    </>
  );
};

export default LeftSideBar;

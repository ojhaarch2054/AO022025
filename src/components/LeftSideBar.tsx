import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "./context/Context";
import { useNavigate } from "react-router-dom";
import { Sensor } from "../interfaces/sensorData";


interface LeftSideBarProps {
  sensorData: Sensor[];
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ sensorData }) => {
  const navigate = useNavigate();
  const {
    anchorEl,
    setAnchorEl,
    menuChartIndex,
    setMenuChartIndex,
    setClickedChartIndex,
    setChartClicked,
  } = useAppContext();

  //to manage the selected sensor
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  //to close the menu
  const handleClose = () => {
    setAnchorEl(null);
    setMenuChartIndex(null);
  };
  //to handle chart click event
  const handleChartClick = (i: number) => {
    setChartClicked(true);
    setClickedChartIndex(i);
    handleClose();
  };
  //to handle menu icon click event
  const handleMenuIconClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuChartIndex(index);
  };
  //to navigate to the add chart page
  const handleEditItem = () => {
    navigate("/add-chart");
  };

  //for delete item
  const dltClick = () => {
    alert("Do you want to delete??");
    console.log("delete Icon clicked!!");
  };

  return (
    <>
      <List>
        {sensorData.length === 0 ? (
          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            No charts
          </Typography>
        ) : (
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
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuChartIndex === i}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEditItem}>
                  <ModeEditIcon />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
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
    </>
  );
};

export default LeftSideBar;

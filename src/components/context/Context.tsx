import React, { createContext, useState, useContext, ReactNode } from "react";
import { useMediaQuery } from "@mui/material";
import { Sensor } from "../../interfaces/sensorData";

//define a type for the context value
interface ContextValue {
  isSmallScreen: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchClicked: boolean;
  setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
  chartClicked: boolean;
  setChartClicked: React.Dispatch<React.SetStateAction<boolean>>;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  menuChartIndex: number | null;
  setMenuChartIndex: React.Dispatch<React.SetStateAction<number | null>>;
  clickedChartIndex: number | null;
  setClickedChartIndex: React.Dispatch<React.SetStateAction<number | null>>;
  sensorData: Sensor[];
  setSensorData: React.Dispatch<React.SetStateAction<Sensor[]>>;
  formData: {
    name: string;
    chartType: string;
    color: string;
    dataseries: string;
    xAxis: string;
    yAxis: string;
    textDescription: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    chartType: string;
    color: string;
    dataseries: string;
    xAxis: string;
    yAxis: string;
    textDescription: string;
  }>>;
}

//create context with a default value
const ContextApi = createContext<ContextValue | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  //media query to check if the screen is small
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  //state for the search term in mobile device
  const [searchTerm, setSearchTerm] = useState("");
  //state for the search dialog
  const [searchClicked, setSearchClicked] = useState(false);
  //or track chart has been clicked or not
  const [chartClicked, setChartClicked] = useState(false);
  //to store the html element that triggered the menu
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  //to store the index of the chart for which the menu is open
  const [menuChartIndex, setMenuChartIndex] = useState<number | null>(null);
  //to store the index of the chart which is clicked
  const [clickedChartIndex, setClickedChartIndex] = useState<number | null>(
    null
  );
  //to store data from addChart
  const [sensorData, setSensorData] = useState<Sensor[]>([]);
  //o store form data with initial values for each field
  const [formData, setFormData] = useState({
    name: '',
    chartType: '',
    color: '',
    dataseries: '',
    xAxis: '',
    yAxis: '',
    textDescription: ''
  });

  return (
    <ContextApi.Provider
      value={{
        isSmallScreen,
        searchTerm,
        setSearchTerm,
        searchClicked,
        setSearchClicked,
        chartClicked,
        setChartClicked,
        anchorEl,
        setAnchorEl,
        menuChartIndex,
        setMenuChartIndex,
        clickedChartIndex,
        setClickedChartIndex,
        sensorData,
        setSensorData,
        formData,
        setFormData
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };
export const useAppContext = () => {
  const context = useContext(ContextApi);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};
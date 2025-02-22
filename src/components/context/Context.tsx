import React, { createContext, useState, useContext, ReactNode } from "react";
import { useMediaQuery } from "@mui/material";
import { Sensor } from "../../interfaces/sensorData";
import { useEffect } from "react";
import sensorDataFromJson from "../../dataSeries.json"

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
  sensorData: Sensor[]
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
  const [chartClicked, setChartClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuChartIndex, setMenuChartIndex] = useState<number | null>(null);
  const [clickedChartIndex, setClickedChartIndex] = useState<number | null>(
    null
  );
  //state to store data
  const [sensorData, setSensorData] = useState<Sensor[]>([]);

  //fetch data from json
  useEffect(() => {
    //set the value of sensorData
    setSensorData(sensorDataFromJson);
  }, []);

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
        sensorData
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

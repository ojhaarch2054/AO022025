//interface for leftSideBarComponent

//for dataseries
export interface DataSeries {
    value: number;
    date: string;
  }
  //for sensor state
  export interface Sensor {
      name: string;
      dataseries: { value: number; date: string }[];
  }
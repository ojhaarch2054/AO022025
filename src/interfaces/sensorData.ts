//interface for leftSideBarComponent

//for dataseries
export interface DataSeries {
    value: number;
    date: string;
  }
  //for sensor state
  export interface Sensor {
    name: string;
    chartType: string;
    color: string;
    dataseries: DataSeries[];
    textDescription: string;
    xAxis: string;
    yAxis: string;
  }
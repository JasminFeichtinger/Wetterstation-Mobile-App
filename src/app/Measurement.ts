import { Sensor } from "./Sensor";

export interface Measurement {
    id: number;
    timeStamp: Date;
    temperature: number,
    humidity: number
    sensor: Sensor
  }
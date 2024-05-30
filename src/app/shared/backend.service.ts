import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Sensor } from '../Sensor';
import { Measurement } from '../Measurement'
import { StoreService } from './store.service';
import { Http, HttpResponse } from '@nativescript/core'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  sensoren: Sensor[] = [];
  measurements: Measurement[] = [];

  constructor(private storeService: StoreService, private http: HttpClient) { }

  //to get the sensors from backend
  public async getSensoren() {
    // need to use emulator IP address instead of loopback (localhost/127.0.0.1)
    this.sensoren = await firstValueFrom(this.http.get<any>('http://10.0.2.2:8082/sensors?projection=angular')
      .pipe(
        map(data => data._embedded.sensors)
      ));
    this.storeService.sensoren = this.sensoren; //store sensors in array
  }

  //to get the measurments from backend
  public async getMeasurements() {
    // need to use emulator IP address instead of loopback (localhost/127.0.0.1)
    const measurementsResponse = await firstValueFrom(this.http.get<any>('http://10.0.2.2:8082/measurements?projection=angular&size=6000', {observe: 'response'}));
    const measurements = measurementsResponse.body._embedded.measurements.map((measurmentData: any) => {
      const sensor: Sensor = this.sensoren.filter(sensor => sensor.id == measurmentData.sensor.id)[0];
      return { ...measurmentData, sensor }
    });
    this.storeService.measurments = measurements; //store measurements in array
  }

  //to get the last meaurment of an sensor
  public async getLatestMeasurementOfSensor(sensorId:number){
    const measurementsResponse = await firstValueFrom(this.http.get<any>(`http://10.0.2.2:8082/sensors/${sensorId}/measurements?projection=angular&size=6000`, {observe: 'response'}));
    const measurements = measurementsResponse.body._embedded.measurements;
    
    this.storeService.latestMeasurement = measurements.reverse()[0]; //store measurement
  }

}

import { Component, OnInit } from '@angular/core'
import { BackendService } from '~/app/shared/backend.service';
import { StoreService } from '~/app/shared/store.service';
import { Measurement } from '../Measurement'

@Component({
  selector: 'latest-measurments',
  templateUrl: './latest-measurements.component.html',
  styleUrls: ['./latest-measurements.component.css']
})
export class LatestMeasurementsComponent implements OnInit {
  constructor(private backendService: BackendService, public storeService: StoreService) { }
  //to store measurments
  measurements: Measurement[] = [];
  //to know if Button is clicked or not
  showData: boolean = false;
  //to store information about the last clicked sensor 
  lastSensorId: number = 0;
  //output chosen sensor 
  sensorName:String = "(click Sensor)";

  async ngOnInit() {
    await this.backendService.getSensoren();
    await this.backendService.getMeasurements();
  }

  outputSensor(number: number) { //number -> sensorId
    if (number !== this.lastSensorId) {
      this.measurements = this.storeService.measurments.filter(function (data) {
        return data.sensor.id == number; //if number is the same store in measurements
      }).slice(-10).reverse(); //.slice -> to get only 10 values back, reverse -> to get the last values back
      this.showData = true; //button is selected
      this.lastSensorId = number; //store number in lastSensorId to know if sensor is already chosen

      //to get sensor name for display which sensor is choosen
      this.sensorName = this.storeService.sensoren.filter(function(sensor){
        return sensor.id == number;
      })[0].name;

    } else {
      this.measurements = []; //return an empty array
      this.showData = false; //button isn't selected
      this.lastSensorId = 0; //no sensor is chosen
      this.sensorName = "(click Sensor)"; //change name to click Sensor
    }
  }
}


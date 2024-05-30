import { Component, OnInit } from '@angular/core';
import { Measurement } from '../Measurement';
import { BackendService } from '../shared/backend.service';
import { StoreService } from '../shared/store.service';

@Component({
	moduleId: module.id,
	selector: 'temp-hum',
	templateUrl: './temp-hum.component.html',
	styleUrls: ['./temp-hum.component.css']
})

export class TempHumComponent implements OnInit {
	latestTempArray:Measurement[]=[]; //to store measurements in array

	constructor(private backendService: BackendService, public storeService: StoreService) {}
	
	async ngOnInit() {
		await this.backendService.getSensoren();
		await this.backendService.getMeasurements();

		//to get last measurment of each Sensor, repeat for all sensors
		this.storeService.sensoren.forEach(async sensor => {
			await this.backendService.getLatestMeasurementOfSensor(sensor.id);
			this.latestTempArray.push(this.storeService.latestMeasurement); //store in lastestTempArray
		});
	  }

	

	
}
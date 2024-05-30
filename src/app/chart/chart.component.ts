import { Component, OnInit } from '@angular/core';
import { dateProperty } from '@nativescript/core/ui/date-picker';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { Measurement } from '../Measurement';
import { BackendService } from '../shared/backend.service';
import { StoreService } from '../shared/store.service';

@Component({
	moduleId: module.id,
	selector: 'chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

	constructor(private backendService: BackendService, public storeService: StoreService) { }

	measurments:Measurement[] = []; //to store measurments

	async ngOnInit() {
		await this.backendService.getSensoren();
		await this.backendService.getMeasurements();
		this.measurments = this.storeService.measurments.sort((a,b)=> {
			return new Date(a.timeStamp).valueOf() - new Date(b.timeStamp).valueOf(); //sort measuremet by date
		});
	}
	
	returnValuesForChart(days:number){ //days -> how many days for chart (30,7 or 1 day)
		return this.measurments.filter(function(a){
			return new Date(a.timeStamp).valueOf() > new Date(removeDays(new Date(),days)).valueOf(); //store in meaurments if the date is bigger than today - days (30,7 or 1 day)
		});
		
	}

}
//to remove the days from today
function removeDays(date, days) {
	date.setDate(date.getDate() - days);
	return date;
  }
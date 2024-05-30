import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LatestMeasurementsComponent } from './latest-measeurments/latest-measurements.component';
import { HttpClientModule } from '@angular/common/http';
import { TempHumComponent } from './temp-hum/temp-hum.component'
import { ChartComponent } from './chart/chart.component'
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, HttpClientModule, NativeScriptUIChartModule],
  declarations: [AppComponent,LatestMeasurementsComponent, TempHumComponent,ChartComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

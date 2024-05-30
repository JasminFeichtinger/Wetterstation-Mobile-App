import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { LatestMeasurementsComponent } from './latest-measeurments/latest-measurements.component'

const routes: Routes = [
  { path: '', component: LatestMeasurementsComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

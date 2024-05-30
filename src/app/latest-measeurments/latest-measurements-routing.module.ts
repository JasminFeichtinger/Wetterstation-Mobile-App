import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { LatestMeasurementsComponent } from './latest-measurements.component'

const routes: Routes = [{ path: '', component: LatestMeasurementsComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class LatestMeasurementsRoutingModule {}

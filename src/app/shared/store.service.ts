
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Measurement } from '../Measurement';
import { Sensor } from '../Sensor';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  //To store infomation and have acces to the arrays from another component without having to call the methothe each time

  //to store sensors 
  public sensoren: Sensor[] = [];
  //to store measurements
  public measurments: Measurement[] = [];
  //to store last measurement from sensor
  public latestMeasurement: Measurement;
}

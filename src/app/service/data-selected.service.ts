import { Injectable } from '@angular/core';
import { City } from '../city';

@Injectable({
  providedIn: 'root'
})
export class DataSelectedService {
  selectedForecast: City[];
  constructor() { }
}

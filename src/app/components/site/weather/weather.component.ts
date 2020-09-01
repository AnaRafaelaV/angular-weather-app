import {Component,  ElementRef, ViewChild, OnInit} from '@angular/core';
import { CITIESFORECAST } from '../../../weather-data';
import { City } from '../../../city';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {DataSelectedService} from '../../../service/data-selected.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  forecast = CITIESFORECAST;
  tempSelectedC = [];
  selectedCities= [];
  myControl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  nCities = true;
  showTable= false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredCities: Observable<City[]>;


  get selectedForecast(): City[]{
    return this.selectedData.selectedForecast;
  }

  set selectedForecast(value: City[]){
    this.selectedData.selectedForecast = value;
  }

  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private selectedData: DataSelectedService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    console.log(this.myControl.value);
      this.filteredCities = this.myControl.valueChanges.pipe(
        startWith(null),
        map((city: string | null) => city ? this._filter(city) : this.forecast.slice()));
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    
    console.log(this.selectedCities.toString());
    if (this.selectedCities.length>=2){
      this.nCities = false;
    }else{
      console.log('tem de selecionar pelo menos 3')
    }

    

    // Adicionar cidade
    if ((value || '').trim()) {
      if(this._contaisCity(value)){
        if(this._selected(value)){
          this._snackBar.open("This city is already selected!",'',{panelClass: ['darkblue-snackbar']})._dismissAfter(2000);
        }else{
          this.selectedCities.push(value.trim());
        }
      }
      else{
        this._snackBar.open("This city is not available!",'',{panelClass: ['darkblue-snackbar']})._dismissAfter(2000);
        console.log('não está na lista');
        // fazer um alert
      }
    }

    // Remover o input
    if (input) {
      input.value = ''; 
    }

    this.myControl.setValue(null);
  }

  remove(city: string): void {
    const index = this.selectedCities.indexOf(city);
    if (index >= 0) {
      this.selectedCities.splice(index, 1);
      if (this.selectedCities.length<=2){
        this.nCities = true;
        this.showTable = false;
      }else{
        console.log('tem de selecionar pelo menos 3')
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(this.selectedCities.toString());
    if (this.selectedCities.length>=2){
      this.nCities = false;
    }else{
      console.log('tem de selecionar pelo menos 3')
    }

    console.log('selected');
    if(!this._selected(event.option.viewValue)){
      this.selectedCities.push(event.option.viewValue);
    }
    else{
      this._snackBar.open("This city is already selected!",'',{panelClass: ['darkblue-snackbar']})._dismissAfter(2000);
      console.log('já foi selecionado');
      // fazer um alert
    }
    this.cityInput.nativeElement.value = "";
    event.option.value= null;
    this.myControl.setValue(null);
    
  }

  private _filter(city : string): City[] {
    if(typeof(city) === 'string'){
      console.log('aquiiiii');
    const filterValue = city.toLowerCase();
    return this.forecast.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }else{
      this._filterSelected(city);
    }
  }

  private _filterSelected(city : City): City[] {
    const filterValue = city.name.toLowerCase();
    return this.forecast.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _contaisCity(city : string): boolean{
    let contains = false;
    this.forecast.forEach(element => {
      if (element.name == city){
        contains = true;
      }
   });
    return contains;
  }

  private _selected(city:String): boolean{
    console.log('verificar');
    console.log(city);
   if(this.selectedCities.includes(city)){
      return true;
   }else{
     return false;
   }
  }

  submitForm(){
    console.log('submit');
    this.tempSelectedC = [];
    this.selectedCities.forEach(name => {
      this.forecast.forEach(city => {
        if(name === city.name){
          this.tempSelectedC.push(city);
        }
      });
    });
    this.showTable = true;
    this.selectedForecast = this.tempSelectedC;
  }
}

import { Component, ViewChild } from '@angular/core';
import { DataSelectedService } from 'src/app/service/data-selected.service';
import { City } from 'src/app/city';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})

export class CityDetailComponent {

  constructor(private selectedData: DataSelectedService) {
   }
  displayedColumns: string[] = ['name', 'tMax', 'tMin', 'sunrise', 'sunset'];
  data = this.selectedData.selectedForecast;
  dataSource = new MatTableDataSource(this.data);


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


  get selectedForecast(): City[]{
    return this.selectedData.selectedForecast;
  }
}

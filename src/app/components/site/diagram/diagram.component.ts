import { Component, OnInit } from '@angular/core';
import { DataSelectedService } from 'src/app/service/data-selected.service';
import { City } from 'src/app/city';
import { Color } from 'ng2-charts/lib/color';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
  constructor(private selectedData: DataSelectedService) { }


  dataSource = this.selectedData.selectedForecast;

  public barChartLabels =[]
  public colors: Color[] = [
    { backgroundColor: '#081e3d' },];

  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [];
  ngOnInit() {
    this.dataSource.forEach((element)=>{
      this.barChartLabels.push(element.name);
      this.barChartData.push({data: element.tMax, label: element.name});
    });
  }
  get selectedForecast(): City[]{
    return this.selectedData.selectedForecast;
  }

  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
             display: true,
             labelString: 'Highest Temperature (ºC)'
          }
        }
      ]
    }
  }
}

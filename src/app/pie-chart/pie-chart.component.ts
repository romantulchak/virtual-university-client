import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { StudentGroupGradeDTO } from '../dto/student-group-grade.dto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() studentGrades: StudentGroupGradeDTO[];

  public gradeData: number[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true
  }
  private grades: number[] = [];
  public gradeLabels: Label[] = ['Grade 5', 'Grade 4.5','Grade 4', 'Grade 3.5', 'Grade 3', 'Grade 2'];
  public chartColors: any[] = [{backgroundColor:["#1a7431", "#2dc653", "#6ede8a", "#ffdd00", "#add7f6",  "#a4161a"]}];
  private possibleGrades: number[] = [5, 4.5, 4, 3.5, 3, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnChanges(){
    console.log(this.studentGrades);
    
    this.getCountOfGrades(this.studentGrades);
  }

  ngAfterContentInit(){

  }

  private getCountOfGrades(grades?: StudentGroupGradeDTO[]){
    this.gradeData = [];
    this.grades = [];
    grades.forEach(grade => this.grades.push(grade.grade));
    this.possibleGrades.forEach(grade => this.gradeData.push(this.grades.filter(v => v === grade).length));
  }

  

}

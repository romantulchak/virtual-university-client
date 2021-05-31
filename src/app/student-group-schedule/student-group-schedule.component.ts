import { Component, OnInit } from '@angular/core';
import { ScheduleDayDTO } from '../dto/schedule-day.dto';
import { ScheduleDTO } from '../dto/schedule.dto';
import { SemesterDTO } from '../dto/semester.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { DateRangeFilter } from '../filters/date-range.filter';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-group-schedule',
  templateUrl: './student-group-schedule.component.html',
  styleUrls: ['./student-group-schedule.component.scss']
})
export class StudentGroupScheduleComponent implements OnInit {

  constructor(private studentGroupService: StudentGroupService, 
              private tokenStorageService: TokenStorageService, 
              private scheduleService: ScheduleService,
              private scheduleDayService: ScheduleDayService) { }
  private studentId: number;
  public group: StudentGroupDTO;
  public schedule: ScheduleDTO;
  public scheduleId: number;
  public selectedSemester: SemesterDTO;
  ngOnInit(): void {
   this.studentId = this.tokenStorageService.getUser().id;
   this.getGroup();

  }

  private getGroup(){
    this.studentGroupService.findStudentGroup(this.studentId,).subscribe(
      res=>{
          this.group = res;
      }
    );
  }

  private getScheduleIdByGroup(){
    this.scheduleService.getScheduleIdForGroup(this.selectedSemester.id).subscribe(
      res=>{
        this.scheduleId = res;
        this.getDaysForWeek();

      }
    );
  }


  public getScheduleForGroup(group: StudentGroupDTO = this.group) {
    this.scheduleService.getScheduleForGroup(this.selectedSemester.id).subscribe(
      res => {        
        this.schedule = res;
        this.group = group;  
      }
    );
  }

  public getDaysForWeek(){
    this.scheduleDayService.getDaysForWeek(this.selectedSemester.id).subscribe(
      res=>{        
        this.schedule = this.intiSchedule(res, this.scheduleId);

      }
    );
  }
  public filterByRange(date: DateRangeFilter){
    this.scheduleDayService.getScheduleInRange(date.dayAfter, date.dayBefore, this.scheduleId).subscribe(
      res => {
        this.schedule = this.intiSchedule(res,this.scheduleId);
      }
    );
  }

  private intiSchedule(days: ScheduleDayDTO[], id?: number):ScheduleDTO{
    let schedule = new ScheduleDTO();
    if(id != null){
      schedule.id = id;
    }
    schedule.days = days
    return schedule;
  }
  public getSemesterSelected(semester: SemesterDTO){
    this.selectedSemester = semester;
    this.getScheduleIdByGroup();
  }

}

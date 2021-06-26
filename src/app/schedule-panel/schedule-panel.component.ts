import { Component, OnInit } from '@angular/core';
import { ScheduleDTO } from '../dto/schedule.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';
import {DateRangeFilter} from '../filters/date-range.filter';
import { ScheduleDayDTO } from '../dto/schedule-day.dto';
import { SemesterDTO } from '../dto/semester.dto';
@Component({
  selector: 'app-schedule-panel',
  templateUrl: './schedule-panel.component.html',
  styleUrls: ['./schedule-panel.component.scss']
})
export class SchedulePanelComponent implements OnInit {

  public currentGroup: StudentGroupDTO;
  public subjectTeacher: SubjectTeacherGroupDTO[];
  public groups: StudentGroupDTO[];
  public schedule: ScheduleDTO;
  public selectedSemester: SemesterDTO;
  private scheduleId: number;

  constructor(private groupService: StudentGroupService,
              private scheduleService: ScheduleService,
              private scheduleDayService: ScheduleDayService) { }

  ngOnInit(): void {
    this.getAllGroups();  
    this.updateSchedule();
  }


  public getScheduleForGroup(group: StudentGroupDTO = this.currentGroup) {
    this.scheduleService.getScheduleForGroup(this.selectedSemester.id).subscribe(
      res => {
        this.schedule = res;
        this.currentGroup = group;  
      }
    );
  }

  public selectGroup(group: StudentGroupDTO){
    this.currentGroup = group;
    this.selectedSemester = group.semester;
      this.getScheduleIdByGroup();
  }

  private getAllGroups(){
    this.groupService.findAllGroups().subscribe(
      res=>{
        this.groups = res;
      }
    );
  }


  private updateSchedule() {
    this.scheduleService.updateSchedule.subscribe(
      res=>{
        if(res){
          this.getScheduleForGroup();
        }
        
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

  private getScheduleIdByGroup(){
    this.scheduleService.getScheduleIdForGroup(this.selectedSemester.id).subscribe(
      res=>{
        this.scheduleId = res;
        this.getDaysForWeek();

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

  public filterByRange(date: DateRangeFilter) {
    this.scheduleDayService.getScheduleInRange(date.dayAfter, date.dayBefore, this.schedule.id).subscribe(
      res => {
        this.schedule = this.intiSchedule(res,this.scheduleId);
      }
    );
  }
  public getSemesterSelected(semester: SemesterDTO){
    this.selectedSemester = semester;
    this.getDaysForWeek();
  }
}

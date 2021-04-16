import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDayComponent } from '../add-day/add-day.component';
import { ScheduleDTO } from '../dto/schedule.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { Schedule } from '../model/schedule.model';
import { StudentGroup } from '../model/studentGroup.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { LessonService } from '../service/lesson.service';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-schedule-panel',
  templateUrl: './schedule-panel.component.html',
  styleUrls: ['./schedule-panel.component.scss']
})
export class SchedulePanelComponent implements OnInit {

  public currentGroup: StudentGroup;
  public schedule: ScheduleDTO;
  public subjectTeacher: SubjectTeacherGroupDTO[];
  public groups: StudentGroupDTO[];




  constructor(private scheduleService: ScheduleService,
              private groupService: StudentGroupService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllGroups();  
    this.updateSchedule();
  }



  private getAllGroups(){
    this.groupService.findAllGroups().subscribe(
      res=>{
        this.groups = res;
      }
    );
  }

  public getScheduleForGroup(group: StudentGroup = this.currentGroup) {
    this.scheduleService.getScheduleForGroup(group.id).subscribe(
      res => {

        this.schedule = res;
        this.currentGroup = group;  
      }
    );
  }
  


  public addNewScheduleDay(){
    this.dialog.open(AddDayComponent, {
      data:{
        schedule: this.schedule,
        currentGroup: this.currentGroup
      },
      panelClass:"create-day-modal"
    });
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

 
}

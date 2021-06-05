import {Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ScheduleDTO} from '../dto/schedule.dto';
import { SemesterDTO } from '../dto/semester.dto';
import {StudentGroupDTO} from '../dto/studentGroup.dto';
import {DateRangeFilter} from '../filters/date-range.filter';
import { ScheduleDayService } from '../service/schedule-day.service';
import {ScheduleService} from '../service/schedule.service';
import {StudentGroupService} from '../service/student-group.service';
import {TokenStorageService} from '../service/tokenStorage.service';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent implements OnInit {
  public group: StudentGroupDTO;
  public schedule: ScheduleDTO = new ScheduleDTO();
  public scheduleId: number;
  public selectedSemester: SemesterDTO;
  private teacherId: number;
  private groupId: number;

  constructor(private studentGroupService: StudentGroupService,
    private tokenStorageService: TokenStorageService,
    private scheduleService: ScheduleService, private router: ActivatedRoute, private scheduleDayService: ScheduleDayService) {
      router.parent.params.subscribe(
        res=>{
          this.groupId = res.id;
        }
      );
        
    }

  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getGroup();

    if(this.group == null){
      location.href = `profile/teacher/group-details/${this.groupId}`;
    }
  }

  private getGroup() {
    this.studentGroupService.teacherCurrentGroup.subscribe(
      res=>{
        if(res != null){
          this.group = res;
          if(this.selectedSemester != null){
            this.getScheduleForGroup();
          }
        }
      }
    );
  }

  private getScheduleIdByGroup() {
    this.scheduleService.getScheduleIdForGroup(this.selectedSemester.id).subscribe(
      res => {
        this.schedule = new ScheduleDTO();
        this.scheduleId = res;
        this.schedule.id = res;        
      }
    );
  }


  public getScheduleForGroup(group: StudentGroupDTO = this.group) {
    this.scheduleService.getScheduleForTeacherByGroup(this.teacherId, group.id, this.selectedSemester.id).subscribe(
      res => {
        this.schedule = res;
        this.group = group;
      }
    );
  }

  //TODO: get days for week for teacher
  public getDaysForWeek(){
    this.scheduleDayService.getDaysForTeacherForWeek(this.teacherId, this.selectedSemester.id).subscribe(
      res=>{        
        // this.getScheduleIdByGroup();
        this.schedule = new ScheduleDTO();
        this.schedule.days = res;        
      }
    );
  }
  public filterByRange(date: DateRangeFilter) {
  
  }

  public getSemesterSelected(semester: SemesterDTO){
    this.selectedSemester = semester;
    this.getDaysForWeek();
  }
}

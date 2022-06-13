import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDayComponent } from '../add-day/add-day.component';
import { AddLessonDialogComponent } from '../add-lesson-dialog/add-lesson-dialog.component';
import { ScheduleDayDTO } from '../dto/schedule-day.dto';
import { ScheduleDTO } from '../dto/schedule.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';
import { DateRangeFilter } from '../filters/date-range.filter';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { LessonService } from '../service/lesson.service';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { saveAs } from 'file-saver';
import { SemesterDTO } from '../dto/semester.dto';
import { StatusEnum } from '../model/enum/status.enum';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/tokenStorage.service';
import { ChangeLessonStatusComponent } from '../change-lesson-status/change-lesson-status.component';
import {EditLesson} from '../model/lesson/edit.lesson.model';
import {LessonDay} from '../model/lesson/lesson.day.model';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit, OnChanges, AfterViewInit {

  public days: ScheduleDayDTO[];
  public scheduleId: number;
  public rangeFilter: boolean = false;
  public rangeGroup: FormGroup;
  public currentDay: ScheduleDay;
  private dateRange: DateRangeFilter;
  private apiToExport: string;
  private teacherId: number;
  @Input("schedule") schedule: ScheduleDTO;
  @Input("isAdmin") isAdmin: boolean = false;
  @Input("isEditable") isEditable: boolean = false;
  @Input("group") group: StudentGroupDTO;
  @Input("selectedSemester") selectedSemester: SemesterDTO;
  @Output("showAllDays") showAllDays: EventEmitter<boolean> = new EventEmitter();
  @Output("showDaysForWeek") showDaysForWeek: EventEmitter<boolean> = new EventEmitter();
  @Output("showDaysByRange") showDaysByRange: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder,
              private scheduleDayService: ScheduleDayService,
              private lessonService: LessonService,
              private dialog: MatDialog,
              private scheduleService: ScheduleService,
              private notificationService: NotificationService,
              private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.generateRangeForm();
    this.updateLessonsInDay();

  }

  ngOnChanges(){
    if(this.group != null && this.schedule != null){
      this.days = this.schedule.days;
      this.scheduleId = this.schedule.id;
      this.teacherId = this.tokenStorageService.getUser().id;
    }
  }

  ngAfterViewInit(){
  }

  private updateLessonsInDay(){
    this.lessonService.lesson.subscribe(
      res=>{
        if(res != null){
            this.currentDay.lessons.push(res as unknown as Lesson);
        }
      }
    );
  }


  private generateRangeForm() {
    this.rangeGroup = this.fb.group({
      dayAfter: ['', Validators.required],
      dayBefore: ['', Validators.required]
    });
  }
  public setFilterOption() {
    this.rangeFilter = true;
  }

  public filterByRange() {
    this.dateRange = {
      dayAfter: this.dayAfter,
      dayBefore: this.dayBefore
    };
    this.showDaysByRange.emit(this.dateRange);
  }


  get dayAfter(): string {
    return this.rangeGroup.get('dayAfter').value;
  }
  get dayBefore(): string {
    return this.rangeGroup.get('dayBefore').value;
  }

  public setCurrentDay(day: ScheduleDay) {
    this.currentDay = day;
    this.dialog.open(AddLessonDialogComponent, {
      data: {
        currentDay: this.currentDay,
        group: this.group,
        selectedSemester: this.selectedSemester
      }
    });
  }

   /**
    * This method remove lesson from day
    * @param obj lesson: LessonDTO, day: ScheduleDayDTO
    */
  public deleteLessonFromDay(obj: any){
      if(window.confirm('Are you sure you want to delete this lesson?')){
        let lesson = obj.lesson;
        let day = obj.day;
        this.lessonService.delete(lesson.id).subscribe(
          res=>{
            day.lessons = day.lessons.filter(x=>x.id != lesson.id);
            this.notificationService.showNotification(`Lesson was deleted`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
          },
          error=>{
            this.notificationService.showNotification(error.error.message, error.statusText, error.status);
          }
        );
      }
  }

  /**
   * This method allow to edit lesson in day
   *
   * @param editLessonModel lesson: LessonDTO, day: ScheduleDayDTO {@link EditLessonComponent}
   */
  public editLessonInDay(editLessonModel: EditLesson): void {
    const editDialog = this.dialog.open(EditLessonComponent, {
      data: {
        lesson: editLessonModel.lesson,
        group: this.group,
        currentDay: editLessonModel.day,
        selectedSemester: this.selectedSemester
      }
    });
    editDialog.afterClosed().subscribe(
      (res: LessonDay) => {
        const lessonDTO = this.days.find(day => day.id === res.dayId)?.lessons.find(lesson => lesson.id === res.lesson.id);
        lessonDTO.dateStart = new Date(res.lesson.dateStart);
        lessonDTO.dateEnd = new Date(res.lesson.dateEnd);
        lessonDTO.roomNumber = res.lesson.roomNumber;
        lessonDTO.subjectTeacher = res.lesson.subjectTeacher;
      });
  }



  public deleteDayFromSchedule(day: ScheduleDayDTO){
    if(window.prompt(`Are you sure that you wan to delete all day: ${day.day} ? Please enter YES`) == 'YES'){
      this.scheduleDayService.deleteDayFromSchedule(day.id).subscribe(
        res=>{
          this.days = this.days.filter(d => d.id != day.id);
          this.notificationService.showNotification(`Day: ${day.day} was deleted`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        },
        error=>{
          this.notificationService.showNotification(error.error.message, error.statusText, error.status);
        }
      );
    }

  }


  public getAllDays(api: string){
    this.showAllDays.emit(true);
    this.rangeFilter = false;
    this.apiToExport = api;
  }

  public getDaysForWeek(api: string){
    this.apiToExport = api;
    this.rangeFilter = false;
    this.showDaysForWeek.emit(true);
  }



  public addNewScheduleDay(){
    this.dialog.open(AddDayComponent, {
      data:{
        scheduleId: this.scheduleId,
        currentGroup: this.group,
        selecetedSemester:this.selectedSemester
      },
      panelClass:"create-day-modal"
    });
  }
  public exportPdf(){
    this.scheduleService.downloadPDF(this.scheduleId, this.selectedSemester.id, this.apiToExport).subscribe(
        res=>{
          saveAs(res, "schedule.pdf");
        }
    );
  }

  /**
   * This method allow to change status of lesson
   *
   * @param obj lesson: LessonDTO, day: ScheduleDayDTO
   */
  public changeStatus(obj: any): void {
    this.dialog.open(ChangeLessonStatusComponent, {
      data: {
        lesson: obj.lesson,
        currentDay: obj.day,
        semester: this.selectedSemester
      }
    });
  }
}

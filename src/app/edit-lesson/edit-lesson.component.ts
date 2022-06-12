import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SubjectTeacherGroupDTO} from '../dto/subjectTeacherGroup.dto';
import {StudentGroupService} from '../service/student-group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EditLessonRequest} from '../request/edit-lesson.request';
import {LessonService} from '../service/lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditLessonComponent implements OnInit  {

  public subjectTeacher: SubjectTeacherGroupDTO[];
  public editFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private groupService: StudentGroupService,
              private lessonService: LessonService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initEditFormGroup();
    this.findSubjectsForGroup();
  }

  public edit(): void {
    const editFormGroupValue = this.editFormGroup.value;
    const editLessonRequest = Object.assign(new EditLessonRequest(), editFormGroupValue);
    editLessonRequest.dateStart = this.concatDateWithTime(this.data.currentDay.day, editFormGroupValue.dateStart);
    editLessonRequest.dateEnd = this.concatDateWithTime(this.data.currentDay.day, editFormGroupValue.dateEnd);
    editLessonRequest.subjectTeacherId = editFormGroupValue.subject.id;
    this.lessonService.updatedLesson(editLessonRequest).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  /**
   * Compare times depends on flag
   *
   * @param selectedTime time to be compared
   * @param isDateStart if true checks if Date End is bigger than date start
   *                    otherwise checks if Date Start is bigger than date end
   */
  public changeTime(selectedTime: string, isDateStart: boolean): void {
    if (isDateStart){
      if (this.dateEnd.value <= selectedTime){
        this.dateEnd.setErrors({incorrect: true});
      } else {
        this.dateEnd.setErrors(null);
      }
    } else {
      if (this.dateStart.value >= selectedTime){
        this.dateStart.setErrors({incorrect: true});
      } else {
        this.dateStart.setErrors(null);
      }
    }
  }

  /**
   * Inits edit form group
   */
  private initEditFormGroup(): void {
    this.editFormGroup = this.fb.group({
      id: [this.data.lesson.id, Validators.required],
      dateStart: [this.getTimeFromDate(this.data.lesson.dateStart), Validators.required],
      dateEnd: [this.getTimeFromDate(this.data.lesson.dateEnd), Validators.required],
      roomNumber: [this.data.lesson.roomNumber, Validators.required],
      dayId: [this.data.currentDay.id, Validators.required],
      groupId: [this.data.group.id, Validators.required],
      semesterId: [this.data.selectedSemester.id, Validators.required],
      lessonId: [this.data.lesson.id, Validators.required],
      subject: [null, Validators.required]
    });
  }

  /**
   * Finds Subjects for group with Teachers
   */
  private findSubjectsForGroup(): void {
    this.groupService.findSubjectsForGroup(this.data.group.id, this.data.selectedSemester.id).subscribe(
      res => {
        const subjectTeacher = res.find(subjectTeacherDTO => subjectTeacherDTO.id === this.data.lesson.subjectTeacher.id);
        this.editFormGroup.get('subject').setValue(subjectTeacher);
        this.subjectTeacher = res;
      }
    );
  }

  /**
   * Gets time from date. Ex: 2022-06-08T08:25 -> 08:25
   */
  private getTimeFromDate(value: string): string {
    if (value) {
      return value.slice(11, 16);
    }
    return '';
  }

  /**
   * Concat date with time
   * @param date to be concat
   * @param time to be concat
   */
  private concatDateWithTime(date: string, time: string): string{
    return `${date}T${time}`;
  }

  get dateStart(): FormControl {
    return this.editFormGroup.get('dateStart') as FormControl;
  }

  get dateEnd(): FormControl {
    return this.editFormGroup.get('dateEnd') as FormControl;
  }
}

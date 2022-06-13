import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonDTO} from '../dto/lesson.dto';
import {ScheduleDayDTO} from '../dto/schedule-day.dto';
import {Lesson} from '../model/lesson.model';
import {ScheduleDay} from '../model/schedule-day.model';
import {EditLesson} from '../model/lesson/edit.lesson.model';

@Component({
  selector: 'app-lesson-table-card',
  templateUrl: './lesson-table-card.component.html',
  styleUrls: ['./lesson-table-card.component.scss']
})
export class LessonTableCardComponent implements OnInit {

  @Input() lesson: LessonDTO;
  @Input() isAdmin: boolean = false;
  @Input() teacherId: number;
  @Input() isEditable: boolean = false;
  @Input() day: ScheduleDayDTO;
  @Output() deleteLesson: EventEmitter<any> = new EventEmitter();
  @Output() editLesson: EventEmitter<EditLesson> = new EventEmitter();
  @Output() changeStatusOfLesson: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public deleteLessonFromDay(lesson: Lesson, day: ScheduleDay) {
    let obj = {
      lesson: lesson,
      day: day
    };
    this.deleteLesson.emit(obj);
  }

  public editLessonInDay(lesson: Lesson, day: ScheduleDayDTO) {
    let obj = {
      lesson: lesson,
      day: day
    };
    this.editLesson.emit(obj);
  }

  public changeStatus(lesson: Lesson, day: ScheduleDayDTO) {
    let obj = {
      lesson: lesson,
      day: day
    };
    this.changeStatusOfLesson.emit(obj);
  }
}

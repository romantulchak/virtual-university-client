import {LessonDTO} from '../../dto/lesson.dto';
import {ScheduleDayDTO} from '../../dto/schedule-day.dto';

export class EditLesson {
  public lesson: LessonDTO;
  public day: ScheduleDayDTO;

  constructor(lesson: LessonDTO, day: ScheduleDayDTO) {
    this.lesson = lesson;
    this.day = day;
  }
}

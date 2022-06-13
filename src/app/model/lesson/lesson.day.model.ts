import {LessonDTO} from '../../dto/lesson.dto';

export class LessonDay {
  public lesson: LessonDTO;
  public dayId: number;

  constructor(lesson: LessonDTO, dayId: number) {
    this.lesson = lesson;
    this.dayId = dayId;
  }
}

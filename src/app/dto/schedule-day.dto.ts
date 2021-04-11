import { LessonDTO } from "./lesson.dto";
import { ScheduleDTO } from "./schedule.dto";

export class ScheduleDayDTO{
    public id: number;
    public day: Date;
    public lessons: LessonDTO[];
    public schedule: ScheduleDTO;
}
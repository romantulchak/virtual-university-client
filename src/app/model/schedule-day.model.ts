import { Schedule } from "../model/schedule.model";
import { Lesson } from "./lesson.model";


export class ScheduleDay{
    public id: number;
    public day: Date;
    public lessons: Lesson[];
    public schedule: Schedule;
}
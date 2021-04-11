import { SubjectTeacherGroup } from "../model/subjectTeacherGroup.model";
import { ScheduleDay } from "./schedule-day.model";

export class Lesson{
    public id: number;
    public dateStart: Date;
    public dateEnd: Date;
    public subjectTeacher: SubjectTeacherGroup;
    public scheduleDay: ScheduleDay;
    public status: string;
}
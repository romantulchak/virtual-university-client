import { SubjectTeacherGroup } from "../model/subjectTeacherGroup.model";
import { ScheduleDay } from "./schedule-day.model";

export class Lesson{
    public id: number;
    public dateStart: string;
    public dateEnd: string;
    public subjectTeacher: SubjectTeacherGroup;
    public scheduleDay: ScheduleDay;
    public status: string;
    public roomNumber: string;
}
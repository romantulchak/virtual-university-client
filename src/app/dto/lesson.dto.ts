import { ScheduleDay } from "../model/schedule-day.model";
import { SubjectTeacherGroupDTO } from "./subjectTeacherGroup.dto";

export class LessonDTO{
    public id: number;
    public dateStart: Date;
    public dateEnd: Date;
    public subjectTeacher: SubjectTeacherGroupDTO;
    public scheduleDay: ScheduleDay;
    public status: string;
    public groupName: string;
    public roomNumber: string;
    public comment: string;
    public previousStatus: string;
}
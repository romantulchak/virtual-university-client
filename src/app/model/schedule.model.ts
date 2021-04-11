import { StudentGroup } from "./studentGroup.model";
import { ScheduleDay } from "./schedule-day.model";

export class Schedule{
    public id:number;
    public studentGroup: StudentGroup;
    public days: ScheduleDay[];
}
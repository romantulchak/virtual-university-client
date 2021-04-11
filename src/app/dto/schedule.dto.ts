import { ScheduleDayDTO } from "./schedule-day.dto";
import { StudentGroupDTO } from "./studentGroup.dto";

export class ScheduleDTO{
    public id: number;
    public studentGroup: StudentGroupDTO;
    public days: ScheduleDayDTO[];
}
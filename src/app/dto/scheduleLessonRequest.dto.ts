import { RequestDecisionEnum } from "../model/enum/request.enum";
import { Request } from "../model/request.model";
import { LessonDTO } from "./lesson.dto";

export class ScheduleLessonRequestDTO{
    public id: number;
    public actualStatus: string;
    public message: string;
    public lesson: LessonDTO;
    public decision: RequestDecisionEnum;
    public info: Request;
    public semester: number;
}
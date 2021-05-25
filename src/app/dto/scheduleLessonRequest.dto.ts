import { RequestStatusEnum } from "../model/enum/request.enum";
import { LessonDTO } from "./lesson.dto";

export class ScheduleLessonRequestDTO{
    public id: number;
    public status: string;
    public message: string;
    public lesson: LessonDTO;
    public decision: RequestStatusEnum;
}
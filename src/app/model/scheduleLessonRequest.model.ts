import { SemesterDTO } from "../dto/semester.dto";
import { Lesson } from "./lesson.model";

export class ScheduleLessonRequest{
    public id: number;
    public actualStatus: string;
    public message: string;
    public lesson: Lesson;
    public previousStatus: string;
    public decision: string;
    public semesterId: number;
}
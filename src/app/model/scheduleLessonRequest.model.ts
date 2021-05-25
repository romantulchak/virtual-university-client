import { Lesson } from "./lesson.model";

export class ScheduleLessonRequest{
    public id: number;
    public actualStatus: string;
    public message: string;
    public lesson: Lesson;
    public previousStatus: string;
}
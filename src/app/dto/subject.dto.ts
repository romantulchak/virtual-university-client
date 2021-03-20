import { TeacherDTO } from "./teacher.dto";

export class SubjectDTO{
    public id: number;
    public name: string;
    public type: string;
    public teachers: TeacherDTO[];
}
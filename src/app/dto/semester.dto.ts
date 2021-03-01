import { SubjectDTO } from "./subject.dto";

export class SemesterDTO {
    public id: number;
    public name: string;
    public subjects: SubjectDTO[];
    public semesterNumber: number;
}
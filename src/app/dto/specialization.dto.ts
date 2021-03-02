import { SemesterDTO } from "./semester.dto";

export class SpecializationDTO{
    public id: number;
    public name: string;
    public semesters: SemesterDTO[];
}
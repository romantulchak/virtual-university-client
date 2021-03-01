import { SpecializationDTO } from "./specialization.dto";

export class CourseDTO{
    public id: number;
    public name: string;
    public specializationDTO: SpecializationDTO[];
}
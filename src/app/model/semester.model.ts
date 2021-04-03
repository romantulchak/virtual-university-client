import { Specialization } from "./specialization.model";
import { Subject } from "./subject.model";

export class Semester{
    public id?: number;
    public name: string;
    public specialization?: Specialization;
    public semesterNumber: number;
    public startDate:Date;
    public endDate: Date;

}
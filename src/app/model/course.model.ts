import { Specialization } from "./specialization.model";

export class Course{
    public id: number;
    public name: string;
    public specialization: Specialization[];
}
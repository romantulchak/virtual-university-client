import { Course } from "./course.model";
import { Semester } from "./semester.model";
import { Student } from "./student.model";
import { Subject } from "./subject.model";
import { Teacher } from "./teacher.model";

export class Specialization{
    public id?: number;
    public name: string;
    public course: Course;
    public student?: Student[];
    public teacher?: Teacher[];
    public semesters: Semester[];
    public subjects: Subject[];
}
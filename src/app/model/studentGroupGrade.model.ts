import { Student } from "./student.model";
import { StudentGroup } from "./studentGroup.model";
import { Subject } from "./subject.model";

export class StudentGroupGrade{
    public id?: number;
    public studentGroup: StudentGroup;
    public subject: Subject;
    public student: Student;
}
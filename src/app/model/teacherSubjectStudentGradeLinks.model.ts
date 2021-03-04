import { Grade } from "./grade.model";
import { Specialization } from "./specialization.model";
import { Student } from "./student.model";
import { Subject } from "./subject.model";
import { Teacher } from "./teacher.model";

export class TeacherSubjectStudentGradeLinks{
    public id?: number;
    public student?: Student;
    public subject: Subject;
    public grade?: Grade;
    public specialization: Specialization;
    public teacher: Teacher;

}
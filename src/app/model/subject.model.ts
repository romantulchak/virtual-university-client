import { Semester } from "./semester.model";
import { Teacher } from "./teacher.model";
import { TeacherSubjectStudentGradeLinks } from "./teacherSubjectStudentGradeLinks.model";

export class Subject{
    public id?: number;
    public name: string;
    public teacherSubjectStudentGradeLinks?: TeacherSubjectStudentGradeLinks[];
    public type: string;
    public description: string;
    public teachers?: Teacher[];
    public ects: number;
}
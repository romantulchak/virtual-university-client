import { TeacherSubjectStudentGradeLinks } from "./teacherSubjectStudentGradeLinks.model";

export class Subject{
    public id: number;
    public name: string;
    public teacherSubjectStudentGradeLinks: TeacherSubjectStudentGradeLinks[];
}
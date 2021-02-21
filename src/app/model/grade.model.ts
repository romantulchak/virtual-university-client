import { TeacherSubjectStudentGradeLinks } from "./teacherSubjectStudentGradeLinks.model";

export class Grade{
    public id: number;
    public grade: number;
    public teacherSubjectStudentGradeLinks: TeacherSubjectStudentGradeLinks[];
}
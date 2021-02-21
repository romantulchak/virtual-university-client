import { Role } from "./role.model";
import { Specialization } from "./specialization.model";
import { TeacherSubjectStudentGradeLinks } from "./teacherSubjectStudentGradeLinks.model";
import { User } from "./user.model";

export class Teacher extends User{
    public specializations: Specialization[];
    public teacherSubjectStudentGradeLinks: TeacherSubjectStudentGradeLinks[];
    public roles: Role[];
}
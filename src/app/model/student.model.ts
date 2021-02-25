import { Address } from "./addres.model";
import { Role } from "./role.model";
import { Specialization } from "./specialization.model";
import { StudentDetails } from "./studentDetails.model";
import { TeacherSubjectStudentGradeLinks } from "./teacherSubjectStudentGradeLinks.model";
import { User } from "./user.model";

export class Student extends User{
    public studentDetails: StudentDetails;
    public studentStatus: string;
    public address: Address;
    public specializations?: Specialization[];
    public teacherSubjectStudentGradeLinks?: TeacherSubjectStudentGradeLinks[];
    public roles?:Role[];    
}
import { Address } from "../model/addres.model";
import { StudentDetails } from "../model/studentDetails.model";
import { SpecializationDTO } from "./specialization.dto";
import { TeacherSubjectStudentGradeLinkDTO } from "./teacherSubjectStudentGradeLink.dto";
import { UserDTO } from "./user.dto";

export class StudentDTO extends UserDTO{
    public studentDetails: StudentDetails;
    public studentStatus: string;
    public address: Address;
    public specializations: SpecializationDTO[];
    public currentSemester: number;
    public teacherSubjectStudentGradeLinks: TeacherSubjectStudentGradeLinkDTO[];
}
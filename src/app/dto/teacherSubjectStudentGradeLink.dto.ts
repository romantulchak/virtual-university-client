import { GradeDTO } from "./grade.dto";
import { SemesterDTO } from "./semester.dto";
import { SpecializationDTO } from "./specialization.dto";
import { StudentDTO } from "./student.dto";
import { SubjectDTO } from "./subject.dto";
import { TeacherDTO } from "./teacher.dto";

export class TeacherSubjectStudentGradeLinkDTO{
    public grade:number;
    public semester: SemesterDTO;
    public specialization: SpecializationDTO;
    public subject: SubjectDTO;
    public student: StudentDTO;
    public teacher:TeacherDTO;
}
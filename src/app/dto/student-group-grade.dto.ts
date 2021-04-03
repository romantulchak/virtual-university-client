import { StudentDTO } from "./student.dto";
import { StudentGroupDTO } from "./studentGroup.dto";
import { SubjectTeacherGroupDTO } from "./subjectTeacherGroup.dto";

export class StudentGroupGradeDTO{

    public id: number;
    public studentGroup: StudentGroupDTO;
    public subjectTeacherGroup: SubjectTeacherGroupDTO;
    public student: StudentDTO;
    public grade: number;
}
import { SubjectTeacherGroup } from "../model/subjectTeacherGroup.model";
import { SemesterDTO } from "./semester.dto";
import { SpecializationDTO } from "./specialization.dto";
import { StudentDTO } from "./student.dto";
import { SubjectTeacherGroupDTO } from "./subjectTeacherGroup.dto";

export class StudentGroupDTO{
    public id: number;
    public name: string;
    public semester: SemesterDTO;
    public students: StudentDTO[];
    public specialization: SpecializationDTO;
    public subjects: SubjectTeacherGroupDTO[];
}
import { StudentGroupDTO } from "./studentGroup.dto";
import { SubjectDTO } from "./subject.dto";
import { TeacherDTO } from "./teacher.dto";

export class SubjectTeacherGroupDTO{
    public id: number;
    public subject: SubjectDTO;
    public teacher: TeacherDTO;
    public studentGroup: StudentGroupDTO;
}
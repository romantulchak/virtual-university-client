import { StudentGroup } from "./studentGroup.model";
import { Subject } from "./subject.model";
import { Teacher } from "./teacher.model";

export class SubjectTeacherGroup{
    public id?: number;
    public subject?: Subject;
    public teacher?: Teacher;
    public studentGroup?: StudentGroup[];
}
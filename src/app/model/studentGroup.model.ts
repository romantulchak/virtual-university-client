import { Schedule } from "./schedule.model";
import { Semester } from "./semester.model";
import { Specialization } from "./specialization.model";
import { Student } from "./student.model";
import { SubjectTeacherGroup } from "./subjectTeacherGroup.model";

export class StudentGroup{
    public id: number;
    public name: string;
    public semester: Semester;
    public schedule:  Schedule;
    public students: Student[];
    public subjectTeacherGroups: SubjectTeacherGroup[];
    public specialization: Specialization;
}
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {

  public subjectTeacher: SubjectTeacherGroupDTO[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private groupService: StudentGroupService) {
    this.data.lesson.dateStart = this.data.lesson.dateStart.slice(11, 16);  

  }

  ngOnInit(): void {
    console.log(this.data);
    
    
    this.findSubjectsForGroup();
  }

  public setTimeStart(){}
  public setTimeEnd(){}
  public setRoomNumber(){}
  public setSubjectToLesson(){}
  public addLessonToDay(){}


  private findSubjectsForGroup(){
    this.groupService.findSubjectsForGroup(this.data.group.id, this.data.selectedSemester.id).subscribe(
      res=>{
        this.subjectTeacher = res;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectService } from '../service/subject.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-teacher-subject',
  templateUrl: './teacher-subject.component.html',
  styleUrls: ['./teacher-subject.component.scss']
})
export class TeacherSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService, private tokenStorageService: TokenStorageService) { }
  private teacherId: number;
  public subjects: SubjectDTO[];
  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getTeacherSubjects();
  }

  private getTeacherSubjects(){
    this.subjectService.getSubjectsForTeacher(this.teacherId).subscribe(
      res=>{
        this.subjects = res;
        
      }
    );
  }
  public selectedSubject(subject: SubjectDTO){

  }
}

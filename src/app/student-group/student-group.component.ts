import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { StudentGroupService } from '../service/student-group.service';
import { StudentGroupGradeService } from '../service/studentGroupGrade.service';
import { SubjectService } from '../service/subject.service';
import { TokenStorageService } from '../service/tokenStorage.service';
import { SubjectFile } from '../model/subject-file.model';
import { saveAs } from 'file-saver';
import { SemesterDTO } from '../dto/semester.dto';
@Component({
  selector: 'app-student-group',
  templateUrl: './student-group.component.html',
  styleUrls: ['./student-group.component.scss']
})
export class StudentGroupComponent implements OnInit {


  public studentGroup: StudentGroupDTO;
  private studentId: number;
  public gradeForSubject: number;
  public currentSubject: SubjectTeacherGroupDTO = new SubjectTeacherGroupDTO();
  public subjectFiles: SubjectFile[];
  private selectedSemester: SemesterDTO;
  constructor(private groupService: StudentGroupService, 
              private tokenStorageService: TokenStorageService,
              private groupGradeService: StudentGroupGradeService,
              private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentGroup();
  }

  private getStudentGroup(){
    this.groupService.findStudentGroup(this.studentId).subscribe(
      res=>{
        this.studentGroup = res; 
      },
      err=>{
        console.log(err);
        
      }
    );
  }

  private getSubjectsForGroup(){
    this.subjectService.findSubjectsForGroupBySemester(this.selectedSemester.id, this.studentGroup.id).subscribe(
      res=>{
        console.log(res);
        
        this.studentGroup.subjects = res;
      }
    );
  }

  public selectedSubject(subject: SubjectDTO, teacher: TeacherDTO){
    
    
    if(this.currentSubject.subject != subject){
      this.currentSubject.subject = subject;
      this.currentSubject.teacher = teacher;
      this.getGradeForSubject(subject.id);
      this.subjectService.getFilesForSubject(subject.id).subscribe(
        res=>{
          this.subjectFiles = res;
          
        }
      )
    }
  }

  //TODO: make select for semester
  private getGradeForSubject(subjectId: number){
    this.groupGradeService.getGradeForStudentBySubject(this.studentGroup.id, subjectId, this.studentId, this.studentGroup.semester.id).subscribe(
      res=>{
        this.gradeForSubject = res;
      }
    );
  }
  
  public downloadFile(filename: string){
    this.subjectService.downloadFile(filename).subscribe(res=>{
      saveAs(res, filename)
        
    });
  }

  public getSemesterSelected(semester: SemesterDTO){
    this.selectedSemester = semester;
    this.getSubjectsForGroup();       
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentProfileGuardGuard } from './guards/student-profile-guard.guard';
import { LoginComponent } from './login/login.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileGuardGuard } from './guards/teacher-profile-guard.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileGuard } from './guards/profile.guard';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { ControlPanleComponent } from './control-panle/control-panle.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentGradeComponent } from './student-grade/student-grade.component';
import { StudentProfileDetailsComponent } from './student-profile-details/student-profile-details.component';
import { CreateSpecializationComponent } from './create-specialization/create-specialization.component';
import { CreateSemesterComponent } from './create-semester/create-semester.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TeacherSpecializationsComponent } from './teacher-specializations/teacher-specializations.component';
import { TeacherProfileDetailsComponent } from './teacher-profile-details/teacher-profile-details.component';
import { SubjectsPanelComponent } from './subjects-panel/subjects-panel.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { SpecializationPanelComponent } from './specialization-panel/specialization-panel.component';

const routes: Routes = [
  {path:'', component:LoginComponent, canActivate:[LoginGuard, ProfileGuard]},
  {path:'login', component: LoginComponent},
  {path: 'profile', children:[
    {path:'student', component: StudentProfileComponent, children:[
      {path: '', component: StudentProfileDetailsComponent, canActivate:[StudentProfileGuardGuard]},
      {path:'grades', component: StudentGradeComponent},
      {path: 'subjects', component: SubjectsComponent}
    ]},
    {path:'teacher', component: TeacherProfileComponent, children:[
      {path:'', component: TeacherProfileDetailsComponent, canActivate:[TeacherProfileGuardGuard]},
      {path:'teacher-speicalizations', component: TeacherSpecializationsComponent}
    
    ]}, 
    {path:'change-password', component: ChangePasswordComponent}
  ]},
  {path: 'manage', children:[
    {path:'', component: ControlPanleComponent},
    {path:'create-student', component: CreateStudentComponent},
    {path:'create-specialization', component: CreateSpecializationComponent},
    {path: 'create-semester', component: CreateSemesterComponent},
    {path: 'create-subject', component: CreateSubjectComponent},
    {path: 'create-teacher', component: CreateTeacherComponent},
    {path: 'teacher-subject', component: SubjectsPanelComponent},
    {path: 'student-panel', component: StudentPanelComponent},
    {path: 'specialization-panel', component: SpecializationPanelComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

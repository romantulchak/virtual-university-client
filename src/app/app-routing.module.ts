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
import { ProfileComponent } from './profile/profile.component';
import { StudentGradeComponent } from './student-grade/student-grade.component';
import { StudentProfileDetailsComponent } from './student-profile-details/student-profile-details.component';
import { CreateSpecializationComponent } from './create-specialization/create-specialization.component';
import { CreateSemesterComponent } from './create-semester/create-semester.component';

const routes: Routes = [
  {path:'', component:LoginComponent, canActivate:[LoginGuard, ProfileGuard]},
  {path:'login', component: LoginComponent},
  {path: 'profile', children:[
    {path:'student', component: StudentProfileComponent, children:[
      {path: '', component: StudentProfileDetailsComponent, canActivate:[StudentProfileGuardGuard]},
      {path:'grades', component: StudentGradeComponent}
    ]},
    {path:'teacher', component: TeacherProfileComponent, canActivate: [TeacherProfileGuardGuard]}
  ]},
  {path: 'manage', children:[
    {path:'', component: ControlPanleComponent},
    {path:'create-student', component: CreateStudentComponent},
    {path:'create-specialization', component: CreateSpecializationComponent},
    {path: 'create-semester', component: CreateSemesterComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

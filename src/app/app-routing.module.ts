import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentProfileGuardGuard } from './guards/student-profile-guard.guard';
import { LoginComponent } from './login/login.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileGuardGuard } from './guards/teacher-profile-guard.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'', component:LoginComponent, canActivate:[LoginGuard]},
  {path:'student-profile', component: StudentProfileComponent, canActivate:[StudentProfileGuardGuard]},
  {path:'teacher-profile', component: TeacherProfileGuardGuard, canActivate:[TeacherProfileGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

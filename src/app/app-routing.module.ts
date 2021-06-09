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
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TeacherSpecializationsComponent } from './teacher-specializations/teacher-specializations.component';
import { TeacherProfileDetailsComponent } from './teacher-profile-details/teacher-profile-details.component';
import { SubjectsPanelComponent } from './subjects-panel/subjects-panel.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { SpecializationPanelComponent } from './specialization-panel/specialization-panel.component';
import { TeacherSubjectComponent } from './teacher-subject/teacher-subject.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupPanelComponent } from './group-panel/group-panel.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { TeacherGroupsComponent } from './teacher-groups/teacher-groups.component';
import { StudentGroupComponent } from './student-group/student-group.component';
import { GroupDetailsTeacherComponent } from './group-details-teacher/group-details-teacher.component';
import { SchedulePanelComponent } from './schedule-panel/schedule-panel.component';
import { StudentGroupScheduleComponent } from './student-group-schedule/student-group-schedule.component';
import { GroupDetailsTeacherLayoutComponent } from './group-details-teacher-layout/group-details-teacher-layout.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { LessonStatusRequestPanelComponent } from './lesson-status-request-panel/lesson-status-request-panel.component';
import { SettingsComponent } from './settings/settings.component';
const routes: Routes = [
  {path:'', component:LoginComponent, canActivate:[LoginGuard, ProfileGuard]},
  {path:'login', component: LoginComponent},
  {path: 'profile', children:[
    {path:'student', component: StudentProfileComponent, children:[
      {path: '', component: StudentProfileDetailsComponent, canActivate:[StudentProfileGuardGuard]},
      {path:'grades', component: StudentGradeComponent},
      {path: 'my-group', component: StudentGroupComponent},
      {path: 'schedule', component: StudentGroupScheduleComponent}
    ]},
    {path:'teacher', component: TeacherProfileComponent, children:[
      {path:'', component: TeacherProfileDetailsComponent, canActivate:[TeacherProfileGuardGuard]},
      {path:'teacher-speicalizations', component: TeacherSpecializationsComponent},
      {path: 'subjects', component: TeacherSubjectComponent},
      {path: 'my-groups', component: TeacherGroupsComponent},
      {path: 'group-details/:id', component:GroupDetailsTeacherLayoutComponent , children:[
        {path: '', component: GroupDetailsTeacherComponent},
        {path: 'schedule', component: TeacherScheduleComponent}
      ]}
    ]}, 
    {path:'settings', component:SettingsComponent}
  ]},
  {path: 'manage', children:[
    {path:'', component: ControlPanleComponent},
    {path:'create-student', component: CreateStudentComponent},
    {path: 'create-group', component: CreateGroupComponent},
    {path: 'create-course', component: CreateCourseComponent},
    {path:'create-specialization', component: CreateSpecializationComponent},
    {path: 'create-semester', component: CreateSemesterComponent},
    {path: 'create-subject', component: CreateSubjectComponent},
    {path: 'create-teacher', component: CreateTeacherComponent},
    {path: 'subject-panel', component: SubjectsPanelComponent},
    {path: 'student-panel', component: StudentPanelComponent},
    {path: 'schedule-panel', component: SchedulePanelComponent},
    {path: 'specialization-panel', component: SpecializationPanelComponent},
    {path: 'lesson-request', component: LessonStatusRequestPanelComponent},
    {path: 'group-panel', children:[
      {path: '', component: GroupPanelComponent},
      {path:'groups', component: GroupsComponent},
      {path: 'group-details/:id', component: GroupDetailsComponent}
    ]},
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

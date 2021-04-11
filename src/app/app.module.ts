import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { GradesComponent } from './grades/grades.component';
import { ControlPanleComponent } from './control-panle/control-panle.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ProfileComponent } from './profile/profile.component';
import { StudentGradeComponent } from './student-grade/student-grade.component';
import { StudentProfileDetailsComponent } from './student-profile-details/student-profile-details.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { CreateSpecializationComponent } from './create-specialization/create-specialization.component';
import { CreateSemesterComponent } from './create-semester/create-semester.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { CreateGradesComponent } from './create-grades/create-grades.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TeacherSpecializationsComponent } from './teacher-specializations/teacher-specializations.component';
import { TeacherProfileDetailsComponent } from './teacher-profile-details/teacher-profile-details.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { SubjectsPanelComponent } from './subjects-panel/subjects-panel.component';
import { SubjectSemesterComponent } from './subject-semester/subject-semester.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { SemesterPanelComponent } from './semester-panel/semester-panel.component';
import { SpecializationPanelComponent } from './specialization-panel/specialization-panel.component';
import { TeacherSubjectComponent } from './teacher-subject/teacher-subject.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AdminTopPanelComponent } from './admin-top-panel/admin-top-panel.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import { SubjectsTableComponent } from './subjects-table/subjects-table.component';
import { GroupPanelComponent } from './group-panel/group-panel.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { TeacherGroupsComponent } from './teacher-groups/teacher-groups.component';
import { StudentGroupComponent } from './student-group/student-group.component';
import { GroupInformationComponent } from './group-information/group-information.component';
import { GroupDetailsTeacherComponent } from './group-details-teacher/group-details-teacher.component';
import { SubjectCardComponent } from './subject-card/subject-card.component';
import { SchedulePanelComponent } from './schedule-panel/schedule-panel.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentProfileComponent,
    GradesComponent,
    ControlPanleComponent,
    CreateStudentComponent,
    ProfileComponent,
    StudentGradeComponent,
    StudentProfileDetailsComponent,
    SpecializationsComponent,
    CreateSpecializationComponent,
    CreateSemesterComponent,
    CreateSubjectComponent,
    CreateGradesComponent,
    CreateTeacherComponent,
    ChangePasswordComponent,
    TeacherSpecializationsComponent,
    TeacherProfileDetailsComponent,
    TeacherProfileComponent,
    SubjectsPanelComponent,
    SubjectSemesterComponent,
    StudentPanelComponent,
    SemesterPanelComponent,
    SpecializationPanelComponent,
    TeacherSubjectComponent,
    CreateCourseComponent,
    CreateGroupComponent,
    AdminTopPanelComponent,
    SubjectsTableComponent,
    GroupPanelComponent,
    GroupsComponent,
    GroupDetailsComponent,
    StudentsTableComponent,
    TeacherGroupsComponent,
    StudentGroupComponent,
    GroupInformationComponent,
    GroupDetailsTeacherComponent,
    SubjectCardComponent,
    SchedulePanelComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatStepperModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSortModule,
        NgxMaterialTimepickerModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddLessonDialogComponent } from './add-lesson-dialog/add-lesson-dialog.component';
import { AddDayComponent } from './add-day/add-day.component';
import { StudentGroupScheduleComponent } from './student-group-schedule/student-group-schedule.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { GroupDetailsTeacherLayoutComponent } from './group-details-teacher-layout/group-details-teacher-layout.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { ChangeSemesterComponent } from './change-semester/change-semester.component';
import { GroupSemestersComponent } from './group-semesters/group-semesters.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';
import { AllSubjectsButtonComponent } from './all-subjects-button/all-subjects-button.component';
import { NavUserComponent } from './nav-user/nav-user.component';
import { ChangeLessonStatusComponent } from './change-lesson-status/change-lesson-status.component';
import { LessonStatusRequestPanelComponent } from './lesson-status-request-panel/lesson-status-request-panel.component';
import { InjectableRxStompConfig, InjectableRxStompRpcConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { RxStompConfig } from './config/rxStomp.config';
import { NotificationBoxComponent } from './notification-box/notification-box.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GroupCardComponent } from './group-card/group-card.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DatePipe } from '@angular/common';
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
    ScheduleTableComponent,
    AddLessonDialogComponent,
    AddDayComponent,
    StudentGroupScheduleComponent,
    EditLessonComponent,
    GroupDetailsTeacherLayoutComponent,
    TeacherScheduleComponent,
    ChangeSemesterComponent,
    GroupSemestersComponent,
    NotificationComponent,
    AllSubjectsButtonComponent,
    NavUserComponent,
    ChangeLessonStatusComponent,
    LessonStatusRequestPanelComponent,
    NotificationBoxComponent,
    GroupCardComponent,
    PieChartComponent,
    
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
      NgxMaterialTimepickerModule,
      MatDialogModule,
      MatSnackBarModule,
      InfiniteScrollModule,
      ChartsModule
    ],
  providers: [authInterceptorProviders,
    {
      provide: InjectableRxStompConfig,
      useValue: RxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

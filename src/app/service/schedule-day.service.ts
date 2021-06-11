import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ScheduleDayDTO } from "../dto/schedule-day.dto";

const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class ScheduleDayService{
    constructor(private http: HttpClient){}

    public checkIfDayFree(scheduleId: number, day: string):Observable<boolean>{
        let params = new HttpParams();
        params = params.append('scheduleId', scheduleId.toString()).append('day', day);
        return this.http.get<boolean>(API_URL + 'schedule-day/checkIfFree', {params: params});
    }
    public getScheduleInRange(dayAfter: string, dayBefore: string, scheduleId: number):Observable<ScheduleDayDTO[]>{
        let params = new HttpParams();
        params = params.append('scheduleId', scheduleId.toString()).append('dayAfter', dayAfter).append('dayBefore', dayBefore);
        return this.http.get<ScheduleDayDTO[]>(API_URL + 'schedule-day/findScheduleInRange', {params: params});
    }
    public deleteDayFromSchedule(dayId: number):Observable<any>{
        return this.http.delete(API_URL + 'schedule-day/delete/' + dayId);
    }
    public getDaysForWeek(semesterId: number):Observable<ScheduleDayDTO[]>{
        return this.http.get<ScheduleDayDTO[]>(`${API_URL}schedule-day/findScheduleForWeek/${semesterId}`);
    }
    public getDaysForTeacherForWeek(teacherId: number, semesterId: number): Observable<ScheduleDayDTO[]>{
        let params = new HttpParams();
        params = params.append('teacherId', teacherId.toString()).
                        append('semesterId', semesterId.toString())
        return this.http.get<ScheduleDayDTO[]>(API_URL + 'schedule-day/findScheduleForTeacherForWeek', {params: params});
    }

    public getDayByDateAndGroupName(day: string, groupName: string, semester: number):Observable<ScheduleDayDTO>{
        return this.http.get<ScheduleDayDTO>(`${API_URL}schedule-day/getDayLessons/${day}/${groupName}/${semester}`);
    }

}
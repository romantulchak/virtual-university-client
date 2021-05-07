import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ScheduleDTO } from "../dto/schedule.dto";
import { Schedule } from "../model/schedule.model";

const API_URL = environment.api;
@Injectable({
    providedIn:'root'
})
export class ScheduleService{
    public updateSchedule: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient){}

    public create(schedule: Schedule):Observable<any>{
        return this.http.post(API_URL + 'schedule/create', schedule);
    }
    public getScheduleForGroup(groupId: number):Observable<ScheduleDTO>{
        return this.http.get<ScheduleDTO>(API_URL + 'schedule/findForGroup/' + groupId);
    }
    public getScheduleIdForGroup(groupId: number):Observable<number>{
        return this.http.get<number>(API_URL + 'schedule/findScheduleIdForGroup/' + groupId);
    }
    public getScheduleForTeacherByGroup(teacherId: number, groupId: number): Observable<ScheduleDTO>{
        let params = new HttpParams();
        params = params.append("teacherId", teacherId.toString()).append("groupId", groupId.toString());
        return this.http.get<ScheduleDTO>(API_URL + 'schedule/findScheduleForTeacherByGroup', {params: params});
    }
    public downloadPDF(scheduleId: number, api: string = 'exportPdf-w'): Observable<Blob>{
        return this.http.get(API_URL + 'schedule/'+ api + '/' + scheduleId, {responseType: 'blob'});
    }
}
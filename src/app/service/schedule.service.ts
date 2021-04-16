import { HttpClient } from "@angular/common/http";
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

}
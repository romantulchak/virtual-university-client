import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

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
}
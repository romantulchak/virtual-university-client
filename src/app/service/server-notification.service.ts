import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ServerNotificationDTO } from "../dto/server-notification.dto";

const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class ServerNotificationService{
    constructor(private http: HttpClient){}

    public findAllNotificationsForUser(userId: number):Observable<ServerNotificationDTO[]>{
        return this.http.get<ServerNotificationDTO[]>(API_URL + 'notification');
    }
    public getNotReadNotificationCount():Observable<number>{
        return this.http.get<number>(API_URL + 'notification/notificationCounter');
    }
}
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StatusEnum } from "../model/enum/status.enum";
import { Notification } from "../model/notification.model";
import { NotificationComponent } from "../notification/notification.component";
import { SettingsService } from "./settings.service";

const NOTIFICATION_DURATION = 7000;
@Injectable({
    providedIn:'root'
})
export class NotificationService{
    constructor(private snackBar: MatSnackBar, 
                private settingsService: SettingsService){
    }

    public showNotification(msg: string, status: string, code: number){
        let settings = this.settingsService.getSettings();
        if(settings.isNotificationEnable){
            let notification = new Notification(msg, status, code);
            this.snackBar.openFromComponent(NotificationComponent, {
                duration: NOTIFICATION_DURATION,
                data: notification,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: code == StatusEnum.OK ? 'success-notification':
                            code == StatusEnum.BAD_REEQUSET ? 'error-notification':
                            code == StatusEnum.UNAUTHORIZED || StatusEnum.FORBIDDEN ? 'unauthorized-notification' : ''
            });
        }
    }
}
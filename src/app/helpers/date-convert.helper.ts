import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class DateConvertHelper{
    

    public static convertDateToString(date: string, time: string){
        return date + "T" + time;
    }

}
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Settings } from "../model/settings.model";

@Injectable({
    providedIn:'root'
})
export class SettingsService{
    constructor(){

    }
    public getSettings(): Settings{
       return JSON.parse(localStorage.getItem('settings'));
    }

    public setSettings(settings: Settings): void{   
        localStorage.setItem('settings', JSON.stringify(settings));
    }

}
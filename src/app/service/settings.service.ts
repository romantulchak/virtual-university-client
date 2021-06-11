import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Settings } from "../model/settings.model";

@Injectable({
    providedIn:'root'
})
export class SettingsService{
    private settings: Settings = new Settings(true, "English");
    constructor(){

    }
    public getSettings(): Settings{
        let settings = JSON.parse(localStorage.getItem('settings'));
        if(settings == null){
            this.setSettings(this.settings);
        }
       return JSON.parse(localStorage.getItem('settings'));
    }

    public setSettings(settings: Settings): void{   
        localStorage.setItem('settings', JSON.stringify(settings));
    }

}
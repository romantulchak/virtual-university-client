export class Settings{
    public isNotificationEnable: boolean;
    public language: string;

    constructor(isNotificationEnable: boolean, language: string){
        this.isNotificationEnable = isNotificationEnable;
        this.language = language;
    }
}
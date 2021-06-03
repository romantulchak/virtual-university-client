export class ChangeStatusResponse{
    public requestStatus: string;
    public userFullName:string;
    public username: string;

    constructor(requestStatus: string, userFullName: string, username: string){
        this.requestStatus = requestStatus;
        this.userFullName = userFullName;
        this.username = username;
    }
}
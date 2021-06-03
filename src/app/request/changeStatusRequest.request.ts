import { RequestStatusEnum } from "../model/enum/request-status.enum";

export class ChangeStatusRequest{
    public id: number;
    public requestStatus: string;

    constructor(id: number, requestStatus: string){
        this.id = id;
        this.requestStatus = requestStatus;
    }
}
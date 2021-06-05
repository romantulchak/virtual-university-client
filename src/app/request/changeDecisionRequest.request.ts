import { RequestDecisionEnum } from "../model/enum/request.enum";

export class ChangeDecisionRequest{
    public id: number;
    public requestDecision: RequestDecisionEnum;
    public comment: string;

    constructor(id: number, requestDecision: RequestDecisionEnum, comment: string){
        this.id = id;
        this.requestDecision = requestDecision;
        this.comment = comment;
    }
}
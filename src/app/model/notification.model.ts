
export class Notification{
    public message: string;
    public status: string;
    public code: number;

    constructor(message?: string, status?: string, code?: number){
        this.message = message;
        this.status = status;
        this.code = code;
    }
}
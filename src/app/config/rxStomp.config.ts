import { InjectableRxStompConfig } from "@stomp/ng2-stompjs";
import { environment } from "src/environments/environment";

export const RxStompConfig: InjectableRxStompConfig = {
    brokerURL: environment.webSocket,

    heartbeatIncoming:0,
    heartbeatOutgoing:20000,

    reconnectDelay: 200,
    debug:(msg: string):void =>{
        console.log(msg);
        
    }
}
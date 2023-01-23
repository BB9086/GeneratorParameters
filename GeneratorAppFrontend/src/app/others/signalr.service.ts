import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr"
import { LoginService } from "../login/login.service";

@Injectable()
export class SignalrService {

    hubConnection:signalR.HubConnection;
    constructor(private loginService:LoginService) {

      
    }

    startConnection=()=>{
        this.hubConnection=new signalR.HubConnectionBuilder().withUrl("https://localhost:44318/notify",{
            skipNegotiation:true,
            transport:signalR.HttpTransportType.WebSockets
        }).build();

        this.hubConnection.start().then(()=>{
            console.log("SignalR connected!");
        }).catch(err=>console.log('Error while starting connection: '+err));

        this.hubConnection.on("MessageReceived",(message)=>{
            console.log(message);
            this.loginService.notificationMessage=+message;
        });


    }

    sendMessage(){
        this.hubConnection.invoke("SendMessage")
        .catch(err=>console.log(err));
    }

    receivedMessage(){
        this.hubConnection.on("MessageReceived",(message)=>{
            console.log(message);
            this.loginService.notificationMessage=+message;
        });

    }

}
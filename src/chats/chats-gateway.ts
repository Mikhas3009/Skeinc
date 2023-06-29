import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { AuthService } from "src/auth/auth.service";
import { cookieParser } from "src/hepls-services/cookieParser";
import { ChatsService } from "./chats.service";

@WebSocketGateway({allowEIO3:true})
export class ChatGateway{

    constructor(
        private authService:AuthService,
        private chatService:ChatsService
    ){}

    @WebSocketServer()
    server:Server;

    @SubscribeMessage("message")
    async handleMessage(@ConnectedSocket() client,@MessageBody() socketData){
        const parsedCookies = cookieParser(client.handshake.headers.cookie);
        const {id}=this.authService.decodeToken(parsedCookies.AccsesToken)
        socketData.userSenderID=id;
        try{
            await this.chatService.saveMessage(socketData);
            this.server.emit(`message:${socketData.userRecipientId}`,socketData);
        }
        catch(err){
            //client.close();
        }
    }
}
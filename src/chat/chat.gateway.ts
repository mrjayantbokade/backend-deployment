import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ChatMessage {
  user: string;
  message: string;
  timestamp: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { user: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const chatMessage: ChatMessage = {
      user: data.user,
      message: data.message,
      timestamp: new Date().toISOString(),
    };
    this.server.emit('message', chatMessage);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { user: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const joinMessage: ChatMessage = {
      user: 'System',
      message: `${data.user} joined the chat`,
      timestamp: new Date().toISOString(),
    };
    this.server.emit('message', joinMessage);
  }
}

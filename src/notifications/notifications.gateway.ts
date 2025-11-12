import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/notifications',
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private notificationInterval: NodeJS.Timeout;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    
    // Send notifications every 5 seconds
    this.notificationInterval = setInterval(() => {
      const notification = {
        id: Date.now(),
        title: 'New Notification',
        message: 'You have a new update!',
        type: Math.random() > 0.5 ? 'info' : 'warning',
        timestamp: new Date().toISOString(),
      };
      this.server.emit('notification', notification);
    }, 5000);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
}

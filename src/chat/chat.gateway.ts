import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { CommentService } from 'comment/comment.service';
import { CreateCommentDto } from 'comment/dto';
import { Server, Socket } from 'socket.io';
import { User, UserDocument } from 'user/user.shema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly commentService: CommentService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      // INFO:  { sub: '63393710a6ca510e36fdd894', iat: 1665299356, exp: 1665899296 }
      const payload = this.jwtService.verify(
        client.handshake.headers.authorization,
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      );

      const user = await this.userModel.findOne({ _id: payload.sub });
      if (!user) {
        throw new WsException('Invalid credentials.');
      }

      client.on('room', function (room) {
        client.join(room);
      });
    } catch (error) {
      client.disconnect();
    }
  }

  @SubscribeMessage('send_message')
  async listenMessages(
    @MessageBody() msg: CreateCommentDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const message = await this.commentService.create(msg);

    this.server
      .to(msg.documentId as unknown as string)
      .emit('receive_message', message);

    return message;
  }

  //   @SubscribeMessage('request_all_messages')
  //   async requestAllMessages(@ConnectedSocket() socket: Socket) {
  //     await this.chatService.getUserFromSocket(socket);
  //     const messages = await this.chatService.getAllMessages();

  //     socket.emit('send_all_messages', messages);
  //   }
}

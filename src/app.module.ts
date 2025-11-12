import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// REST Controllers
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { TasksController } from './tasks/tasks.controller';

// GraphQL Resolvers
import { PostsResolver } from './posts/posts.resolver';
import { CommentsResolver } from './comments/comments.resolver';

// WebSocket Gateways
import { ChatGateway } from './chat/chat.gateway';
import { NotificationsGateway } from './notifications/notifications.gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      playground: true,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    ProductsController,
    TasksController,
  ],
  providers: [
    AppService,
    PostsResolver,
    CommentsResolver,
    ChatGateway,
    NotificationsGateway,
  ],
})
export class AppModule {}

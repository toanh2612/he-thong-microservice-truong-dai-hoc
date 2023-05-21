import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CONFIG } from "src/common/configs/config";
import { UserEntity } from "src/common/entities/user.entity";
import { userEventHandler } from "./eventHandlers/userEvent.handler";
import { UserController } from "./user.controller";
import UserService from "./user.service";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CONFIG.CLIENT_MODULE.REDIS,
        transport: Transport.REDIS,
        options: {
          db: 0,
          password: CONFIG["REDIS_CLIENT_PASSWORD"],
          port: CONFIG["REDIS_CLIENT_PORT"],
          host: CONFIG["REDIS_CLIENT_HOST"],
          retryAttempts: 5,
          retryDelay: 5000,
        },
      },
    ]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController, userEventHandler],
  providers: [UserService, AuthService],
})
export class UserModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    return consumer;
  }
}

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CONFIG } from "src/common/configs/config";
import { RoleEntity } from "src/common/entities/role.entity";
import { RoleController } from "./role.controller";
import RoleService from "./role.service";

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
				},
			},
		]),
		TypeOrmModule.forFeature([RoleEntity]),
	],
	controllers: [RoleController],
	providers: [RoleService],
})
export class RoleModule implements NestModule {
	constructor() {}

	configure(consumer: MiddlewareConsumer) {
		return consumer;
	}
}

import { Global, Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { CustomConfigModule } from "./common/configs/config.module";
import { RoleModule } from "./modules/role/role.module";
import { UserModule } from "./modules/user/user.module";

@Global()
@Module({
	imports: [CustomConfigModule, UserModule, RoleModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}

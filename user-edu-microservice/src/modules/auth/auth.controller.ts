import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { SystemError } from "src/common/errors/system.error";
import { CONSTANT } from "src/common/untils/constant";
import { AuthService } from "./auth.service";
import { SystemResponse } from "../../common/responses/system.response";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/Login.dto";
import { GetAccessTokenDto as GetAccessTokenDto } from "./dto/GetAccessToken.dto";
@Controller("/auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/login")
	async login(@Body() loginBody: LoginDto) {
		try {
			const { password, username, email } = loginBody;
			const result = await this.authService.login(password, username, email);

			return new SystemResponse(result);
		} catch (error) {
			throw new HttpException(
				{ cause: new SystemError(error) },
				CONSTANT.ERROR.E0000.httpStatusCode
			);
		}
	}

	@Post("/accessToken")
	async getAccessToken(@Body() getAccessTokenBody: GetAccessTokenDto) {
		try {
			const { refreshToken } = getAccessTokenBody;
			const result = await this.authService.getAccessToken(refreshToken);

			return new SystemResponse(result);
		} catch (error) {
			throw new HttpException(
				{ cause: new SystemError(error) },
				CONSTANT.ERROR.E0000.httpStatusCode
			);
		}
	}
}

import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class GetAccessTokenDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	refreshToken?: string;
}

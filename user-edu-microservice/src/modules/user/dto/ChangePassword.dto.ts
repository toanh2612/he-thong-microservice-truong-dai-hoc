import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class ChangePasswordDto {
	@ApiProperty()
	@Expose()
	@IsString()
	newPassword: string;

	@ApiProperty()
	@Expose()
	@IsString()
	oldPassword: string;
}

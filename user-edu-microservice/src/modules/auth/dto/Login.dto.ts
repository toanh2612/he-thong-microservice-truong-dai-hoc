import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@Exclude()
export class LoginDto {
	@ApiPropertyOptional()
	@IsString()
	@Expose()
	@IsOptional()
	username?: string;

	@ApiPropertyOptional()
	@IsString()
	@Expose()
	@IsOptional()
	email?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@Expose()
	password: string;
}

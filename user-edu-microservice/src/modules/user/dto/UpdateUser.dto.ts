import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import {
	IsDateString,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

@Exclude()
export class UpdateUserDto {
	@ApiPropertyOptional()
	@Expose()
	@IsEmail()
	@IsOptional()
	email: string;

	@ApiPropertyOptional()
	@Expose()
	@IsEmail()
	@IsOptional()
	personalEmail: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	firstName: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	lastName: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	@IsOptional()
	phone: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	@IsOptional()
	sex: string;

	@ApiPropertyOptional()
	@Expose()
	@IsDateString()
	@IsOptional()
	birthday: Date;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	@IsOptional()
	roleId: string;
}

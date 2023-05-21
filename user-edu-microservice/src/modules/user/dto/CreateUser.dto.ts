import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class CreateUserDto {
	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty()
	@Expose()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@Expose()
	@IsEmail()
	@IsNotEmpty()
	personalEmail: string;

	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty()
	@Expose()
	@IsString()
	phone: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	sex: string;

	@ApiPropertyOptional()
	@Expose()
	@IsDateString()
	birthday: Date;

	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	roleId: string;
}

import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail, IsString } from "class-validator";

@Exclude()
export class GetUserListFilterDto {
	@ApiPropertyOptional()
	@Expose()
	@IsString()
	id: string | null;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	roleId: string | null;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	username: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	firstName: string;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	lastName: string;

	@ApiPropertyOptional()
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

	@ApiPropertyOptional()
	@Expose()
	@IsEmail()
	email: string;

	@ApiPropertyOptional()
	@Expose()
	@IsEmail()
	personalEmail: string;

	@ApiPropertyOptional()
	@Expose()
	@IsBoolean()
	isDeleted: boolean;

	@ApiPropertyOptional()
	@Expose()
	@IsDateString()
	createdDate: Date;

	@ApiPropertyOptional()
	@Expose()
	@IsDateString()
	updatedDate: Date;
}

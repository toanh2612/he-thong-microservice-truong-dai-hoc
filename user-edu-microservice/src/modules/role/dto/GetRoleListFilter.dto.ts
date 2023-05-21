import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class GetRoleListFilterDto {
	@ApiPropertyOptional()
	@Expose()
	@IsString()
	name: string | null | undefined;

	@ApiPropertyOptional()
	@Expose()
	@IsString()
	description: string | null | undefined;
}

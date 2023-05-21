import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { FilterOptionsType } from "../types/FilterOptions.type";
import { OrderType } from "../types/Order.type";

@Exclude()
export class QueryCommonDto<CustomFilterDto> {
	@ApiPropertyOptional()
	@Expose()
	filter: CustomFilterDto;

	@ApiPropertyOptional({})
	@Expose()
	filterOptions: FilterOptionsType | null | undefined;

	@ApiPropertyOptional()
	@Expose()
	order: OrderType | null | undefined;

	@ApiPropertyOptional()
	@Expose()
	page: any;

	@ApiPropertyOptional()
	@Expose()
	perPage: any;
}

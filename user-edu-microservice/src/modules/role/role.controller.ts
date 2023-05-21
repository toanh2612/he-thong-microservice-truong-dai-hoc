import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { QueryCommonDto } from "src/common/dto/QueryCommon.dto";
import { FilterOptionsType } from "src/common/types/FilterOptions.type";
import { OrderType } from "src/common/types/Order.type";
import { parseQuery } from "src/common/untils/untils";
import { CreateRoleDto } from "./dto/CreateRole.dto";
import { GetRoleListFilterDto } from "./dto/GetRoleListFilter.dto";
import { UpdateRoleDto } from "./dto/UpdateRole.dto";
import RoleService from "./role.service";

@ApiBearerAuth()
@ApiTags("role")
@Controller("/role")
export class RoleController {
	constructor(private readonly roleService: RoleService) {}
	@Get("/:id")
	async getOne(@Param("id") id: string) {
		return await this.roleService.getOne(id);
	}

	@Get("/")
	async getList(@Query() query: QueryCommonDto<GetRoleListFilterDto>) {
		query = parseQuery(query);
		const order: OrderType = query.order;
		const page: number = query.page;
		const perPage: number = query.perPage;
		const filterOptions: FilterOptionsType = query.filterOptions;
		const filter: GetRoleListFilterDto = query.filter;
		return await this.roleService.getList(
			filter,
			order,
			page,
			perPage,
			filterOptions
		);
	}

	@Post("/")
	async create(@Body() createRoleBody: CreateRoleDto) {
		return await this.roleService.create(createRoleBody);
	}

	@Put("/:id")
	async update(@Param("id") id: string, @Body() updateRoleBody: UpdateRoleDto) {
		return await this.roleService.update(id, updateRoleBody);
	}

	@Delete("/:id")
	async delete(@Param("id") id: string) {
		return await this.roleService.delete(id);
	}
}

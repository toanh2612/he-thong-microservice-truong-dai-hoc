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
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { QueryCommonDto } from "src/common/dto/QueryCommon.dto";
import { FilterOptionsType } from "src/common/types/FilterOptions.type";
import { OrderType } from "src/common/types/Order.type";
import { parseQuery } from "src/common/untils/untils";
import { ChangePasswordDto } from "./dto/ChangePassword.dto";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { GetUserListFilterDto } from "./dto/GetUserListFilter.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import UserService from "./user.service";

@Controller("/user")
@ApiTags("user")
@ApiBearerAuth()
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get("/:id")
	async getOne(@Param("id") id: string) {
		return await this.userService.getOne(id);
	}

	@ApiQuery({ name: "filter", type: GetUserListFilterDto })
	@ApiQuery({ name: "filterOptions" })
	@ApiQuery({ name: "perPage", required: false })
	@ApiQuery({ name: "page", required: false })
	@Get("/")
	async getList(@Query() query: QueryCommonDto<GetUserListFilterDto>) {
		query = parseQuery(query);

		const order: OrderType = query.order;
		const page = query.page;
		const perPage = query.perPage;
		const filterOptions: FilterOptionsType = query.filterOptions;
		const filter: GetUserListFilterDto = query.filter;
		return await this.userService.getList(
			filter,
			order,
			page,
			perPage,
			filterOptions
		);
	}

	@Post("/")
	async create(@Body() createUserBody: CreateUserDto) {
		return await this.userService.create(createUserBody);
	}

	@Put("/:id")
	async update(@Param("id") id: string, @Body() updateUserBody: UpdateUserDto) {
		return await this.userService.update(id, updateUserBody);
	}

	@Put("/:id/change-password")
	async changePassword(
		@Param("id") id: string,
		@Body() ChangePasswordBody: ChangePasswordDto
	) {
		return await this.userService.changePassword(id, ChangePasswordBody);
	}

	@Delete("/:id")
	async delete(@Param("id") id: string) {
		return await this.userService.delete(id);
	}
}

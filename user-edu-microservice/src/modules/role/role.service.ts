import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { RoleEntity } from "src/common/entities/role.entity";
import { DataSource } from "typeorm";
import { addOrderBy, addWhere } from "src/common/untils/untils";
import { IRole } from "./interfaces/IRole.interface";
// import { CONFIG } from "src/common/configs/config";
// import { Inject } from "@nestjs/common";
// import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export default class RoleService {
	constructor(
		// @Inject(CONFIG.CLIENT_MODULE.REDIS)
		// private readonly redisClient: ClientProxy,
		@InjectDataSource()
		private dataSource: DataSource
	) {}

	async getList(
		filter: any,
		order: any,
		page: number,
		perPage: number,
		filterOptions?: any
	): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				filterOptions = filterOptions || {};
				const relativeFields: string[] = [];

				let getRoleListQuery = await this.dataSource
					.getRepository(RoleEntity)
					.createQueryBuilder("role")
					// .leftJoinAndSelect("", "")
					.where("role.is_deleted = :isDeleted", { isDeleted: false })
					.skip((page - 1) * perPage)
					.take(perPage);

				getRoleListQuery = addWhere(getRoleListQuery, filter, relativeFields);
				getRoleListQuery = addOrderBy(getRoleListQuery, order);

				const roleFoundList: IRole[] = await getRoleListQuery.getMany();
				const roleFoundCount: number = await getRoleListQuery.getCount();

				return resolve({
					result: roleFoundList,
					paging: {
						page,
						perPage,
						total: roleFoundCount,
					},
				});
			} catch (error) {
				return reject(error);
			}
		});
	}

	async getOne(id: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const roleFound: IRole = await this.dataSource
					.getRepository(RoleEntity)
					.findOne({
						where: {
							id,
						},
					});

				return resolve({
					result: roleFound,
				});
			} catch (error) {
				return reject(error);
			}
		});
	}

	async create(createRoleData: any): Promise<any> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		return new Promise(async (resovle, reject) => {
			try {
				let newRoleData = await queryRunner.manager
					.getRepository(RoleEntity)
					.create(createRoleData);

				const newRoleDataSave: any = await queryRunner.manager
					.getRepository(RoleEntity)
					.save(newRoleData);

				await queryRunner.commitTransaction();
				await queryRunner.release();

				const newRoleFound = await this.dataSource
					.getRepository(RoleEntity)
					.createQueryBuilder("role")
					.where("role.id = :id", {
						id: newRoleDataSave.id,
					})
					.andWhere("role.is_deleted = false")
					.orderBy("role.created_date", "DESC")
					.getOne();

				return resovle({
					result: newRoleFound,
				});
			} catch (error) {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				return reject(error);
			}
		});
	}

	async update(id: string, updateRoleData: any): Promise<any> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		return new Promise(async (resovle, reject) => {
			try {
				let roleFound = await queryRunner.manager
					.getRepository(RoleEntity)
					.createQueryBuilder("role")
					.where("role.id = :id", {
						id: id,
					})
					.andWhere("role.is_deleted = false")
					.getOne();

				if (!roleFound) {
					return reject({
						code: "",
						message: "",
					});
				}

				await queryRunner.manager
					.getRepository(RoleEntity)
					.createQueryBuilder()
					.update(RoleEntity)
					.set(updateRoleData)
					.where("id = :id", { id: roleFound.id })
					.execute();

				await queryRunner.commitTransaction();
				await queryRunner.release();

				roleFound = await this.dataSource
					.getRepository(RoleEntity)
					.createQueryBuilder("role")
					.where("role.id = :id", {
						id: roleFound.id,
					})
					.andWhere("role.is_deleted = false")
					.getOne();

				return resovle({
					result: roleFound,
				});
			} catch (error) {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				return reject(error);
			}
		});
	}

	async delete(id: string): Promise<any> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		return new Promise(async (resovle, reject) => {
			try {
				let roleFound = await queryRunner.manager
					.getRepository(RoleEntity)
					.createQueryBuilder("role")
					.where("role.id = :id", {
						id: id,
					})
					.andWhere("role.is_deleted = false")
					.getOne();

				if (!roleFound) {
					return reject({
						code: "",
						message: "",
					});
				}

				await queryRunner.manager
					.getRepository(RoleEntity)
					.createQueryBuilder()
					.update(RoleEntity)
					.set({
						isDeleted: true,
					})
					.where("id = :id", { id: roleFound.id })
					.execute();

				await queryRunner.commitTransaction();
				await queryRunner.release();

				roleFound = await this.dataSource
					.getRepository(RoleEntity)
					.createQueryBuilder("role")
					.where("role.id = :id", {
						id: roleFound.id,
					})
					.andWhere("role.is_deleted = false")
					.getOne();

				return resovle({
					result: roleFound,
				});
			} catch (error) {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				return reject(error);
			}
		});
	}
}

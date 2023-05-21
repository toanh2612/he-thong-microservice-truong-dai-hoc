import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/common/entities/user.entity";
import { DataSource, SelectQueryBuilder } from "typeorm";
import { IUser } from "./interfaces/IUser.interface";
import { addOrderBy, addWhere } from "src/common/untils/untils";
import { SystemError } from "src/common/errors/system.error";
import { CONSTANT } from "src/common/untils/constant";
const bcrypt = require("bcrypt");

@Injectable()
export default class UserService {
	constructor(
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

				let getUserListQuery = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.leftJoinAndSelect("user.role", "role")
					.where("user.is_deleted = :isDeleted", { isDeleted: false })
					.skip((page - 1) * perPage)
					.take(perPage);

				getUserListQuery = addWhere(getUserListQuery, filter, relativeFields);
				getUserListQuery = addOrderBy(getUserListQuery, order);

				const userFoundList: IUser[] = await getUserListQuery.getMany();
				const userFoundCount: number = await getUserListQuery.getCount();

				return resolve({
					result: userFoundList,
					paging: {
						page,
						perPage,
						total: userFoundCount,
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
				const userFound: IUser = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.leftJoinAndSelect("user.role", "role")
					.where("user.id = :userId", {
						userId: id,
					})
					.andWhere("user.isDeleted = false")
					.getOne();

				return resolve({
					result: userFound,
				});
			} catch (error) {
				return reject(error);
			}
		});
	}

	async create(createUserData: any): Promise<any> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		return new Promise(async (resovle, reject) => {
			try {
				createUserData.password = await bcrypt.hash(createUserData.password, 3);

				let newUserData = await queryRunner.manager
					.getRepository(UserEntity)
					.create(createUserData);

				const newUserDataSave: any = await queryRunner.manager
					.getRepository(UserEntity)
					.save(newUserData);

				await queryRunner.commitTransaction();
				await queryRunner.release();

				const newUserFound = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: newUserDataSave.id,
					})
					.andWhere("user.is_deleted = false")
					.orderBy("user.created_date", "DESC")
					.getOne();

				return resovle({
					result: newUserFound,
				});
			} catch (error) {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				return reject(error);
			}
		});
	}

	async update(id: string, updateUserData: any): Promise<any> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		return new Promise(async (resovle, reject) => {
			try {
				let userFound = await queryRunner.manager
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: id,
					})
					.andWhere("user.is_deleted = false")
					.getOne();

				if (!userFound) {
					throw new SystemError(CONSTANT.ERROR.E0002);
				}

				await queryRunner.manager
					.getRepository(UserEntity)
					.createQueryBuilder()
					.update(UserEntity)
					.set(updateUserData)
					.where("id = :id", { id: userFound.id })
					.execute();

				await queryRunner.commitTransaction();
				await queryRunner.release();

				userFound = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: userFound.id,
					})
					.andWhere("user.is_deleted = false")
					.getOne();

				return resovle({
					result: userFound,
				});
			} catch (error) {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				return reject(error);
			}
		});
	}

	async changePassword(id: string, passwordData: any): Promise<any> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		return new Promise(async (resovle, reject) => {
			try {
				let userFound = await queryRunner.manager
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: id,
					})
					.andWhere("user.is_deleted = false")
					.getOne();

				let { newPassword, oldPassword } = passwordData;

				if (!userFound) {
					throw new SystemError(CONSTANT.ERROR.E0002);
				}

				const compareOldPasswordResult = await bcrypt.compare(
					oldPassword,
					userFound.password
				);

				if (compareOldPasswordResult) {
					throw new SystemError(CONSTANT.ERROR.E0003);
				}

				newPassword = await bcrypt.hash(newPassword, 3);

				await queryRunner.manager
					.getRepository(UserEntity)
					.createQueryBuilder()
					.update(UserEntity)
					.set({
						password: newPassword,
					})
					.where("id = :id", { id: userFound.id })
					.execute();

				await queryRunner.commitTransaction();
				await queryRunner.release();

				userFound = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: userFound.id,
					})
					.andWhere("user.is_deleted = false")
					.getOne();

				return resovle({
					result: userFound,
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
				let userFound = await queryRunner.manager
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: id,
					})
					.andWhere("user.is_deleted = false")
					.getOne();

				if (!userFound) {
					return reject({
						code: "",
						message: "",
					});
				}

				await queryRunner.manager
					.getRepository(UserEntity)
					.createQueryBuilder()
					.update(UserEntity)
					.set({
						isDeleted: true,
					})
					.where("id = :id", { id: userFound.id })
					.execute();

				await queryRunner.commitTransaction();
				await queryRunner.release();

				userFound = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.where("user.id = :id", {
						id: userFound.id,
					})
					.andWhere("user.is_deleted = false")
					.getOne();

				return resovle({
					result: userFound,
				});
			} catch (error) {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				return reject(error);
			}
		});
	}

	getOneById(id: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const userFound: IUser = await this.dataSource
					.getRepository(UserEntity)
					.createQueryBuilder("user")
					.leftJoinAndSelect("user.role", "role")
					.where("user.id = :userId", {
						userId: id,
					})
					.andWhere("user.isDeleted = false")
					.getOne();

				return resolve({
					result: userFound,
				});
			} catch (error) {
				return reject(error);
			}
		});
	}

	getListByIds(ids: string[]): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const userFoundListQuery: SelectQueryBuilder<UserEntity> =
					await this.dataSource
						.getRepository(UserEntity)
						.createQueryBuilder("user");
				if (ids && ids.length) {
					userFoundListQuery.where("user.id IN (:...userIds)", {
						userIds: ids,
					});
				} else {
					return reject();
				}
				const userFoundList: IUser[] = await userFoundListQuery.getMany();

				return resolve({
					result: userFoundList,
				});
			} catch (error) {
				return reject(error);
			}
		});
	}
}

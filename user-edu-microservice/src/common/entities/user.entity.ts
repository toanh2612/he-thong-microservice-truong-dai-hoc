import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity("user")
export class UserEntity {
	@PrimaryGeneratedColumn("uuid", {
		name: "id",
	})
	id: string;

	@Column("varchar", {
		name: "username",
		nullable: false,
	})
	username: string;

	@Column("varchar", {
		name: "password",
		nullable: false,
		select: false,
	})
	password: string;

	@Column({
		type: "uuid",
		name: "role_id",
		nullable: true,
	})
	roleId: string;

	@Column("varchar", {
		name: "first_name",
		nullable: false,
	})
	firstName: string;

	@Column("varchar", {
		name: "last_name",
		nullable: false,
	})
	lastName: string;

	@Column({
		type: "varchar",
		name: "phone",
		nullable: false,
	})
	phone: string;

	@Column({
		type: "varchar",
		name: "personal_email",
		nullable: false,
	})
	personalEmail: string;

	@Column({
		type: "varchar",
		name: "email",
		nullable: false,
	})
	email: string;

	@Column({
		type: "date",
		name: "birthday",
		nullable: false,
	})
	birthday: Date;

	@Column({
		type: "varchar",
		name: "sex",
		nullable: false,
	})
	sex: string;

	@Column({
		name: "is_deleted",
		default: false,
	})
	isDeleted: boolean;

	@CreateDateColumn({
		type: "timestamp",
		name: "created_date",
		default: () => "CURRENT_TIMESTAMP(6)",
	})
	createdDate: Date;

	@UpdateDateColumn({
		type: "timestamp",
		name: "updated_date",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	updatedDate: Date;

	@ManyToOne(() => RoleEntity, (role) => role.users, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({
		name: "role_id",
	})
	role: RoleEntity;
}

export interface IUser {
	id: string | null | undefined;
	roleId: string;
	personalEmail: string;
	username: string;
	password: string;
	email: string;
	phone: string;
	birthday: Date | string | null | undefined;
	isDeleted: boolean;
	createdDate: Date | string | null | undefined;
	updatedDate: Date | string | null | undefined;
}

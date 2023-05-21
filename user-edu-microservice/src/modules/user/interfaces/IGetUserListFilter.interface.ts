export interface IGetUserListFilter {
	id: string | null | undefined;
	roleId: string;
	username: string;
	personalEmail: string;
	email: string;
	phone: string;
	birthday: Date | string | null | undefined;
	isDeleted: boolean;
	createdDate: Date | string | null | undefined;
	updatedDate: Date | string | null | undefined;
}

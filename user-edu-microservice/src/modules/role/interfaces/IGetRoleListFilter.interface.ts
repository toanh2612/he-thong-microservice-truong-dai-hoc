export interface IGetRoleListFilter {
	id: string | null | undefined;
	name: string;
	description: string;
	isDeleted: boolean;
	createdDate: Date | string | null | undefined;
	updatedDate: Date | string | null | undefined;
}

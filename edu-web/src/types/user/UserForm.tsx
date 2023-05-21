export type UserFormType = {
  id: string;
  username: string;
  password: string;
  roleId: string;
  firstName: string;
  lastName: string;
  phone: string;
  personalEmail: string;
  email: string;
  birthday: string;
  sex: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  role: Role;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
};

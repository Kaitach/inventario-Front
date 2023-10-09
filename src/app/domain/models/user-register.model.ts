export interface IUserRegister {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: string;
  branchId: string;
}

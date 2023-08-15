export interface IUserRegister {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

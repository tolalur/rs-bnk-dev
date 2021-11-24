export type User = {
  token: string;
  name: string;
  login: string;
  password: string;
}

export type UserUpdateResponse = Omit<User, 'password'>;

export type UserLogin = Omit<User, 'name' | 'token'>;

export type UserLoginResponse = {
  refresh: string
  roles: Record<'name', UserRolesEnum>[]
  token: string
  userId: number
};

export enum UserRolesEnum  {
  ADMIN = 'admin', NET_ADMIN ='net_admin', USER = 'user'
}

export const isRoleUser = (role: string) => ![UserRolesEnum.ADMIN, UserRolesEnum.NET_ADMIN].some(val => val == role)

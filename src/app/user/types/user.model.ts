export type User = {
  token: string;
  name: string;
  email: string;
  password: string;
}

export type UserUpdateResponse = Omit<User, 'password'>;

export type UserLogin = Omit<User, 'name' | 'token'>;

export type UserLoginResponse = Omit<User, 'password'>;

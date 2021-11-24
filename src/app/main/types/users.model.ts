export interface User {
  id: number;
  login: string;
  email: string ,
  password: string ,
  fio: string ,
  roles: [
    {
      name: string
    }
  ]
}

// оголосіть інтерфейс User
export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface AuthData {
  email: string;
  password: string;
}

import { GeneralResponse } from './general-response.model';

export interface User {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: string;
  name: string;
  nickname: string;
  image: string;
  email: string;
  created_at: string;
  updated_at: string;
  password: string;
  password_confirmation: string;
}

export interface Data {
  token: string;
  client: string;
  uid: string;
  data: User;
  error: string;
}

export interface UserLogin {
  id: number;
  name: string;
  email: string;
}

export interface UserSoap {
  email: string;
  displayName: string;
  role: string;
  emailVerified: boolean;
  photoURL: string;
}

export interface UserData {
  logInUser_1: Data;
  registerUser: UserLogin;
  getUser1a: UserSoap;
}

export interface UserResponse extends GeneralResponse {
  data: UserData;
}


export interface UserSoapResponse extends GeneralResponse {
  data: UserData;
}

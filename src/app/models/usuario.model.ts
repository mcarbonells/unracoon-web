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

export interface UserData {
  allUsers: User[];
  registerUser: User;
}
export interface UserResponse extends GeneralResponse {
  data: UserData;
}
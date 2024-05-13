import { UserType } from "../enums/user-type.enum.js";

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  type: UserType;
 }

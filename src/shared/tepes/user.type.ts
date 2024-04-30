import { UserType } from './user-type.enum copy.js';

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  type: UserType;
 }

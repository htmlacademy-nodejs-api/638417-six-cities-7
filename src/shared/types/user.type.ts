import { UserType } from './index.js';

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  type: UserType;
 }

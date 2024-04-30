import { User } from './user.type.js';

export type Comment = {
  text: string;
  comementDate: Date;
  rating: number;
  author: User;
}

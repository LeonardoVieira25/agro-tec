import { User } from 'firebase/auth';

export type UserData = {
  firebaseData: User | null;
  discussionCode: string | null;
};

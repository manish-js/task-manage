import { Users } from './user.interface';

export interface UserApiResponseInterface {
    status: string;
    users: Users[];
}

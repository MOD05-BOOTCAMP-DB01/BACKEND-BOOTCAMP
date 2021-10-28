import { User } from '../entities/user.entity';

export class ReturnUserDto {
  name: User;
  message: string;
}

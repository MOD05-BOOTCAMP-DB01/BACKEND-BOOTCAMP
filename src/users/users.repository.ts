import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.password = password;

    try {
      await user.save();
      delete user.password;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de e-mail já está em uso!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;

    const { email, name, status, role } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.username ILIKE :username', {
        username: `%${name}%`,
      });
    }

    if (role) {
      query.andWhere('user.role ILIKE :role', { role });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['user.username', 'user.email', 'user.role', 'user.status']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }
}

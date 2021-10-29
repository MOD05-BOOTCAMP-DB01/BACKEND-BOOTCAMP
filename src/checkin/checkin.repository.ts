import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Checkin } from './checkin.entity';
import { CreateCheckinDto } from './dtos/create-checkin.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(Checkin)
export class CheckinRepository extends Repository<Checkin> {
  async createCheckin(
    createCheckinDto: CreateCheckinDto,
    role: UserRole,
  ): Promise<Checkin> {
    const { status, date } = createCheckinDto;
    const check = this.create();
    check.status = status;
    check.date = date;

    try {
      await check.save();
      return check;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Checkin já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o checkin no banco de dados',
        );
      }
    }
  }
}

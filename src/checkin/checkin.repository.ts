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
    const { key_results, valorAtual, date } = createCheckinDto;
    const check = this.create();
    check.valorAtual = valorAtual;
    check.date = date;
    check.key_results = key_results;
    

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

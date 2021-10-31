import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Objective } from './objective.entity';
import { CreateObjectiveDto } from './dtos/create-objective.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(Objective)
export class ObjectiveRepository extends Repository<Objective> {
  async createObjective(
    createObjectiveDto: CreateObjectiveDto,
    role: UserRole,
    ownerID: string,
  ): Promise<Objective> {
    const { objective, type, initial_date, end_date, unity, area } =
      createObjectiveDto;
    const obj = this.create();
    obj.objective = objective;
    obj.type = type;
    obj.initial_date = initial_date;
    obj.end_date = end_date;
    obj.unity = unity;
    obj.area = area;
    obj.ownerID = ownerID;

    try {
      await obj.save();
      return obj;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Objetivo já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o objetivo no banco de dados',
        );
      }
    }
  }
}

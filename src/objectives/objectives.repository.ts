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
  async createObjective({
    createObjectiveDto,
    role,
  }: {
    createObjectiveDto: CreateObjectiveDto;
    role: UserRole;
  }): Promise<Objective> {
    const {
      objective,
      type,
      initial_date,
      end_date,
      unity,
      area,
      owner,
      objective_related,
    } = createObjectiveDto;
    const obj = this.create();
    obj.objective = objective;
    obj.type = type;
    obj.initial_date = initial_date;
    obj.end_date = end_date;
    obj.unity = unity;
    obj.area = area;
    obj.owner = owner;
    obj.objective_related = objective_related;

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

  async findKeyResult(id: string): Promise<any> {
    const query = this.createQueryBuilder('key_result');
    query.where('key_result.id = :id', { id });
    query.innerJoinAndSelect('key_result.objectives', 'objectives');
    query.select(['key_result.id', 'objectives']);
    return await query.getOne();
  }
}

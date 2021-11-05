import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectiveRepository } from './objectives.repository';
import { UserRole } from '../users/user-roles.enum';
import { CreateObjectiveDto } from './dtos/create-objective.dto';
import { Objective } from './objective.entity';
import { UpdateObjectiveDto } from './dtos/update-objective.dto';
import { KeyResult } from 'src/key-results/key-result.entity';

@Injectable()
export class ObjectivesService {
  constructor(
    @InjectRepository(ObjectiveRepository)
    private objectiveRepository: ObjectiveRepository,
  ) {}

  async createObjective(
    createObjectiveDto: CreateObjectiveDto,
  ): Promise<Objective> {
    return this.objectiveRepository.createObjective({
      createObjectiveDto,
      role: UserRole.USER,
    });
  }

  async findAll() {
    return await this.objectiveRepository.find();
  }

  async findKeyResult(keyResultId: string): Promise<KeyResult[]> {
    const keyResult = await this.objectiveRepository.findKeyResult(keyResultId);

    if (!keyResult)
      throw new NotFoundException('Resultado-chave não encontrado');

    return keyResult;
  }

  async findOne(objectiveId: string): Promise<Objective> {
    const obj = await this.objectiveRepository.findOne(objectiveId, {
      select: ['objective', 'type', 'unity', 'area', 'id'],
    });

    if (!obj) throw new NotFoundException('Objetivo não encontrado');

    return obj;
  }

  async updateObjective(
    updateObjectiveDto: UpdateObjectiveDto,
    id: string,
  ): Promise<Objective> {
    const obj = await this.findOne(id);
    const { objective, type, initial_date, end_date, unity, area } =
      updateObjectiveDto;
    obj.objective = objective ? objective : obj.objective;
    obj.type = type ? type : obj.type;
    obj.initial_date = initial_date ? initial_date : obj.initial_date;
    obj.end_date = end_date ? end_date : obj.end_date;
    obj.unity = unity ? unity : obj.unity;
    obj.area = area ? area : obj.area;

    try {
      await obj.save();
      return obj;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar os dados no banco de dados',
      );
    }
  }

  async deleteObjective(objectiveId: string) {
    const result = await this.objectiveRepository.delete({ id: objectiveId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um objetivo com o ID informado',
      );
    }
  }
}

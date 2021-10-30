import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyResultRepository } from './key-result.repository';
import { UserRole } from '../users/user-roles.enum';
import { CreateKeyResultDto } from './dtos/create-key-result.dto';
import { UpdateKeyResultDto } from './dtos/update-key-result.dto';
import { KeyResult } from './key-result.entity';

@Injectable()
export class KeyResultsService {
  constructor(
    @InjectRepository(KeyResultRepository)
    private keyResultRepository: KeyResultRepository,
  ) {}

  async createKeyResult(
    createKeyResultDto: CreateKeyResultDto,
  ): Promise<KeyResult> {
    return this.keyResultRepository.createKeyResult(
      createKeyResultDto,
      UserRole.ADMIN,
    );
  }

  async findAll(): Promise<KeyResult[]> {
    return KeyResult.find();
  }

  async findOne(keyResultId: string): Promise<KeyResult> {
    const kr = await this.keyResultRepository.findOne(keyResultId, {
      select: ['key_result', 'type', 'frequency', 'id'],
    });

    if (!kr) throw new NotFoundException('Resultado-chave não encontrado');

    return kr;
  }

  async updateKeyResult(
    updateKeyResultDto: UpdateKeyResultDto,
    id: string,
  ): Promise<KeyResult> {
    const kr = await this.findOne(id);
    const {
      key_result,
      type,
      frequency,
      owner,
      rating,
      status,
      initial_value,
      goal_value,
      comment,
    } = updateKeyResultDto;
    kr.key_result = key_result ? key_result : kr.key_result;
    kr.type = type ? type : kr.type;
    kr.frequency = frequency ? frequency : kr.frequency;
    kr.owner = owner ? owner : kr.owner;
    kr.rating = rating ? rating : kr.rating;
    kr.status = status ? status : kr.status;
    kr.initial_value = initial_value ? initial_value : kr.initial_value;
    kr.goal_value = goal_value ? goal_value : kr.goal_value;
    kr.comment = comment ? comment : kr.comment;

    try {
      await kr.save();
      return kr;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar os dados no banco de dados',
      );
    }
  }

  async deleteKeyResult(keyResultId: string) {
    const result = await this.keyResultRepository.delete({ id: keyResultId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um resultado-chave com o ID informado',
      );
    }
  }
}

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { KeyResult } from './key-result.entity';
import { CreateKeyResultDto } from './dtos/create-key-result.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(KeyResult)
export class KeyResultRepository extends Repository<KeyResult> {
  async createKeyResult(
    createKeyResultDto: CreateKeyResultDto,
    role: UserRole,
  ): Promise<KeyResult> {
    const { key_result, type, frequency, owner, rating } = createKeyResultDto;
    const kr = this.create();
    kr.key_result = key_result;
    kr.type = type;
    kr.frequency = frequency;
    kr.owner = owner;
    kr.rating = rating;

    try {
      await kr.save();
      return kr;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Resultado-chave já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o resultado-chave no banco de dados',
        );
      }
    }
  }
}

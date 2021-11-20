import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async createTeam(
    createTeamDto: CreateTeamDto,
    role: UserRole,
  ): Promise<Team> {
    const { team } = createTeamDto;
    const tm = this.create();
    tm.team = team;

    try {
      await tm.save();
      return tm;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Time já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o time no banco de dados',
        );
      }
    }
  }
}

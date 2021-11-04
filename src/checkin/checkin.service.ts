import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckinRepository } from './checkin.repository';
import { UserRole } from '../users/user-roles.enum';
import { CreateCheckinDto } from './dtos/create-checkin.dto';
import { UpdateCheckinDto } from './dtos/update-checkin.dto';
import { Checkin } from './checkin.entity';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckinRepository)
    private checkinRepository: CheckinRepository,
  ) {}

  async createCheckin(createCheckinDto: CreateCheckinDto,
    ): Promise<Checkin> {
    return this.checkinRepository.createCheckin(
      createCheckinDto,
      UserRole.USER,
    );
  }

  async findAll(): Promise<Checkin[]> {
    return Checkin.find({
      relations: ['key_results'],
    });
  }

  async findOne(checkinId: string): Promise<Checkin> {
    const check = await this.checkinRepository.findOne(checkinId, {
      select: ['valorAtual', 'date', 'id'],
    });

    if (!check) throw new NotFoundException('Checkin não encontrado');

    return check;
  }

  async updateCheckin(
    updateCheckinDto: UpdateCheckinDto,
    id: string,
  ): Promise<Checkin> {
    const check = await this.findOne(id);
    const { valorAtual, date } = updateCheckinDto;
    check.valorAtual = valorAtual ? valorAtual : check.valorAtual;
    check.date = date ? date : check.date;

    try {
      await check.save();
      return check;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar os dados no banco de dados',
      );
    }
  }

  async deleteCheckin(checkinId: string) {
    const result = await this.checkinRepository.delete({ id: checkinId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um checkin com o ID informado',
      );
    }
  }
}

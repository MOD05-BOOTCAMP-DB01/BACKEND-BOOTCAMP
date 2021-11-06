import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCheckinDto } from './dtos/create-checkin.dto';
import { ReturnCheckinDto } from './dtos/return-checkin.dto';
import { UpdateCheckinDto } from './dtos/update-checkin.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { CheckinService } from './checkin.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('checkin')
@UseGuards(AuthGuard(), RolesGuard)
export class CheckinController {
  constructor(private checkinService: CheckinService) {}

  @Post()
  @Role(UserRole.MANAGER)
  async createCheckin(
    @Body(ValidationPipe) createCheckinDto: CreateCheckinDto,
  ): Promise<ReturnCheckinDto> {
    const checkin = await this.checkinService.createCheckin(createCheckinDto);
    return {
      checkin,
      message: 'Check-in cadastrado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return this.checkinService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ReturnCheckinDto> {
    const checkin = await this.checkinService.findOne(id);
    return {
      checkin,
      message: 'Check-in encontrado',
    };
  }

  @Get('/key_result/:id')
  async findCheckin(@Param('id') id: string) {
    return await this.checkinService.findKeyResult(id);
  }

  @Patch('/:id')
  async updateCheckin(
    @Body(ValidationPipe) updateCheckinDto: UpdateCheckinDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.checkinService.updateCheckin(updateCheckinDto, id);
    }
  }

  @Delete('/:id')
  @Role(UserRole.MANAGER)
  async deleteCheckin(@Param('id') id: string) {
    await this.checkinService.deleteCheckin(id);
    return { message: 'Check-in excluído com sucesso' };
  }
}

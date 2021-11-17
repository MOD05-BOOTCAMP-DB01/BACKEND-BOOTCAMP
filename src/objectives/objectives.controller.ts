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
import { CreateObjectiveDto } from './dtos/create-objective.dto';
import { ReturnObjectiveDto } from './dtos/return-objective.dto';
import { UpdateObjectiveDto } from './dtos/update-objective.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { ObjectivesService } from './objectives.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('objectives')
@UseGuards(AuthGuard(), RolesGuard)
export class ObjectivesController {
  constructor(private objectivesService: ObjectivesService) {}

  @Post()
  @Role(UserRole.MANAGER)
  async createObjective(
    @Body(ValidationPipe) createObjectiveDto: CreateObjectiveDto,
  ): Promise<ReturnObjectiveDto> {
    const objective = await this.objectivesService.createObjective(
      createObjectiveDto,
    );
    return {
      objective,
      message: 'Objetivo cadastrado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return this.objectivesService.findAll();
  }

  @Get('/:id/key_results')
  async findKeyResult(@Param('id') id: string) {
    return await this.objectivesService.findKeyResult(id);
  }

  @Get('/:id')
  @Role(UserRole.MANAGER)
  async findOne(@Param('id') id: string): Promise<ReturnObjectiveDto> {
    const objective = await this.objectivesService.findOne(id);
    return {
      objective,
      message: 'Objetivo encontrado',
    };
  }

  @Patch('/:id')
  async updateObjective(
    @Body(ValidationPipe) updateObjectiveDto: UpdateObjectiveDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.objectivesService.updateObjective(updateObjectiveDto, id);
    }
  }

  @Delete('/:id')
  async deleteObjective(@Param('id') id: string) {
    await this.objectivesService.deleteObjective(id);
    return { message: 'Objetivo excluído com sucesso' };
  }
}

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
import {
  ApiOkResponse,
  ApiTags,
  ApiDefaultResponse,
  ApiOperation,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Objective } from './objective.entity';

@ApiTags('Objective')
@Controller('objectives')
@UseGuards(AuthGuard(), RolesGuard)
export class ObjectivesController {
  constructor(private objectivesService: ObjectivesService) {}

  @Post()
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Cria objetivos' })
  @ApiOkResponse({ description: 'Objetivo cadastrado com sucesso' })
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
  @ApiOperation({ summary: 'Busca todos os objetivos' })
  @ApiOkResponse({ description: 'Objetivo cadastrado com sucesso' })
  async findAll() {
    return this.objectivesService.findAll();
  }

  @Get('/:id/key_results')
  @ApiOperation({
    summary: 'Busca resultados-chaves de um objetivo especificado pelo id',
  })
  @ApiOkResponse({ description: 'Sucesso' })
  @ApiNotFoundResponse({ description: 'Resultado-chave não encontrado' })
  async findKeyResult(@Param('id') id: string) {
    return await this.objectivesService.findKeyResult(id);
  }

  @Get('/:id')
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Busca objetivo pelo id' })
  @ApiOkResponse({ description: 'Objetivo encontrado' })
  @ApiNotFoundResponse({ description: 'Objetivo não encontrado' })
  async findOne(@Param('id') id: string): Promise<ReturnObjectiveDto> {
    const objective = await this.objectivesService.findOne(id);
    return {
      objective,
      message: 'Objetivo encontrado',
    };
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Aplica alterações parciais dos dados' })
  @ApiOkResponse({ description: 'Sucesso' })
  @ApiForbiddenResponse({
    description: 'Você não tem autorização para acessar esse recurso',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao atualizar os dados no banco de dados',
  })
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
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Deleta objetivo pelo id' })
  @ApiOkResponse({ description: 'Objetivo excluído com sucesso' })
  @ApiNotFoundResponse({
    description: 'Não foi encontrado um objetivo com o ID informado',
  })
  async deleteObjective(@Param('id') id: string) {
    await this.objectivesService.deleteObjective(id);
    return { message: 'Objetivo excluído com sucesso' };
  }
}

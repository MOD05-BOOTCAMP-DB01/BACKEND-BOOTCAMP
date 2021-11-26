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
  HttpCode,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { ReturnTeamDto } from './dtos/return-team.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
@UseGuards(AuthGuard(), RolesGuard)
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Cria times' })
  @ApiCreatedResponse({ description: 'Time cadastrado com sucesso' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar o time no banco de dados',
  })
  @ApiConflictResponse({ description: 'Time já cadastrado!' })
  async createTeam(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ): Promise<ReturnTeamDto> {
    const team = await this.teamsService.createTeam(createTeamDto);
    return {
      team,
      message: 'Time cadastrado com sucesso',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os times' })
  @ApiOkResponse({ description: 'Sucesso' })
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca time pelo id' })
  @ApiOkResponse({ description: 'Time encontrado' })
  @ApiNotFoundResponse({ description: 'Time não encontrado' })
  async findOne(@Param('id') id: string): Promise<ReturnTeamDto> {
    const team = await this.teamsService.findOne(id);
    return {
      team,
      message: 'Time encontrado',
    };
  }

  @Get('/:id/objectives')
  @ApiOperation({ summary: 'Busca objetivos de um time especificado pelo id' })
  @ApiOkResponse({ description: 'Objetivos encontrados com sucesso' })
  @ApiNotFoundResponse({ description: 'Time não possui objetivos' })
  async findObjectiveByTeam(@Param('id') id: string) {
    return await this.teamsService.findObjectiveByTeam(id);
  }

  @Get('/:id/users')
  @ApiOperation({ summary: 'Busca usuários de um time especificado pelo id' })
  @ApiOkResponse({ description: 'Usuários encontrados com sucesso' })
  @ApiNotFoundResponse({ description: 'Time não possui usuários' })
  @ApiNotFoundResponse({ description: 'Time não possui usuários' })
  @ApiNotFoundResponse({ description: 'Time não possui usuários' })
  async findUsersByTeam(@Param('id') id: string) {
    return await this.teamsService.findUsersByTeam(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aplica alterações parciais dos dados' })
  @ApiOkResponse({ description: 'Time atualizado com sucesso' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao atualizar os dados no banco de dados',
  })
  @ApiForbiddenResponse({
    description: 'Você não tem autorização para acessar esse recurso',
  })
  async updateTeam(
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.teamsService.updateTeam(updateTeamDto, id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Exclui time por id' })
  @ApiOkResponse({ description: 'Time excluído com sucesso' })
  @ApiNotFoundResponse({
    description: 'Não foi encontrado um time com o ID informado',
  })
  async deleteTeam(@Param('id') id: string) {
    await this.teamsService.deleteTeam(id);
    return { message: 'Time excluído com sucesso' };
  }
}

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
import { YearsService } from './years.service';
import { CreateYearDto } from './dtos/create-year.dto';
import { UpdateYearDto } from './dtos/update-year.dto';
import { ReturnYearDto } from './dtos/return-year.dto';
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

@ApiTags('Years')
@Controller('years')
@UseGuards(AuthGuard(), RolesGuard)
export class YearsController {
  constructor(private yearsService: YearsService) {}

  @Post()
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Cria ano de atividade' })
  @ApiCreatedResponse({ description: 'Ano cadastrado com sucesso' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar o time no banco de dados',
  })
  @ApiConflictResponse({ description: 'Ano já cadastrado!' })
  async createYear(
    @Body(ValidationPipe) createYearDto: CreateYearDto,
  ): Promise<ReturnYearDto> {
    const year = await this.yearsService.createYear(createYearDto);
    return {
      year,
      message: 'Ano cadastrado com sucesso',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os anos cadastrados' })
  @ApiOkResponse({ description: 'Sucesso' })
  async findAll() {
    return this.yearsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca ano pelo id' })
  @ApiOkResponse({ description: 'Ano encontrado' })
  @ApiNotFoundResponse({ description: 'Ano não encontrado' })
  async findOne(@Param('id') id: string): Promise<ReturnYearDto> {
    const year = await this.yearsService.findOne(id);
    return {
      year,
      message: 'Ano encontrado',
    };
  }

  @Get('/:id/objectives')
  @ApiOperation({ summary: 'Busca objetivos de um ano especificado pelo id' })
  @ApiOkResponse({ description: 'Objetivos encontrados com sucesso' })
  @ApiNotFoundResponse({ description: 'Ano não possui objetivos' })
  async findObjectiveByYear(@Param('id') id: string) {
    return await this.yearsService.findObjectiveByYear(id);
  }

  @Get('/:year/:id/objectives')
  @ApiOperation({ summary: 'Busca objetivos por time e ano específicos' })
  @ApiOkResponse({ description: 'Objetivos encontrados com sucesso' })
  @ApiNotFoundResponse({
    description: 'Time não possui objetivos com esse ano',
  })
  async findObjectiveByYearByTeam(
    @Param('year') year: string,
    @Param('id') id: string,
  ) {
    return await this.yearsService.findObjectiveByYearByTeam(year, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aplica alterações parciais dos dados' })
  @ApiOkResponse({ description: 'Ano atualizado com sucesso' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao atualizar os dados no banco de dados',
  })
  @ApiForbiddenResponse({
    description: 'Você não tem autorização para acessar esse recurso',
  })
  async updateYear(
    @Body(ValidationPipe) updateYearDto: UpdateYearDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.yearsService.updateYear(updateYearDto, id);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui ano pelo id' })
  @ApiOkResponse({ description: 'Ano excluído com sucesso' })
  @ApiNotFoundResponse({
    description: 'Não foi encontrado um ano com o ID informado',
  })
  @HttpCode(204)
  @Role(UserRole.MANAGER)
  async deleteYear(@Param('id') id: string) {
    await this.yearsService.deleteYear(id);
    return { message: 'Ano excluído com sucesso' };
  }
}

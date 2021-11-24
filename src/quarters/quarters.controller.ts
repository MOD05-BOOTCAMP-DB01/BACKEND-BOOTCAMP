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
import { QuartersService } from './quarters.service';
import { CreateQuarterDto } from './dtos/create-quarter.dto';
import { UpdateQuarterDto } from './dtos/update-quarter.dto';
import { ReturnQuarterDto } from './dtos/return-quarter.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Quarters')
@Controller('quarters')
@UseGuards(AuthGuard(), RolesGuard)
export class QuartersController {
  constructor(private quartersService: QuartersService) {}

  @Post()
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Cria quarters' })
  @ApiCreatedResponse({ description: 'Quarter cadastrado com sucesso' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar o quarter no banco de dados',
  })
  @ApiConflictResponse({ description: 'Quarter já cadastrado!' })
  async createQuarter(
    @Body(ValidationPipe) createQuarterDto: CreateQuarterDto,
  ): Promise<ReturnQuarterDto> {
    const quarter = await this.quartersService.createQuarter(createQuarterDto);
    return {
      quarter,
      message: 'Quarter cadastrado com sucesso',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Busca quarters cadastrados' })
  @ApiOkResponse({ description: 'Sucesso' })
  async findAll() {
    return this.quartersService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca quarter pelo id' })
  @ApiOkResponse({ description: 'Quarter encontrado' })
  @ApiNotFoundResponse({ description: 'Quarter não encontrado' })
  async findOne(@Param('id') id: string): Promise<ReturnQuarterDto> {
    const quarter = await this.quartersService.findOne(id);
    return {
      quarter,
      message: 'Quarter encontrado',
    };
  }

  @Get('/:quarter/objectives')
  @ApiOperation({summary: 'Busca objetivos para um quarter específico'})
  @ApiResponse({description: 'Objetivos encontrados com sucesso'})
  @ApiNotFoundResponse({description: 'Quarter não possui objetivos'})
  async findObjectiveByQuarter(@Param('quarter') quarter: string) {
    return await this.quartersService.findObjectiveByQuarter(quarter);
  }

  @Get('/:quarter/:id/objectives')
  @ApiOperation({summary: 'Busca objetivos por quarter e time específicos'})
  @ApiOkResponse({description: 'Objetivos encontrados com sucesso'})
  @ApiNotFoundResponse({description: 'Time não possui objetivos com esse quarter'})
  async findObjectiveByQuarterByTeam(
    @Param('quarter') quarter: string,
    @Param('id') id: string,
  ) {
    return await this.quartersService.findObjectiveByQuarterByTeam(quarter, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aplica alterações parciais dos dados' })
  @ApiOkResponse({ description: 'Quarter atualizado com sucesso' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao atualizar os dados no banco de dados',
  })
  @ApiForbiddenResponse({
    description: 'Você não tem autorização para acessar esse recurso',
  })
  async updateQuarter(
    @Body(ValidationPipe) updateQuarterDto: UpdateQuarterDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.quartersService.updateQuarter(updateQuarterDto, id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Role(UserRole.MANAGER)
  @ApiOperation({ summary: 'Exclui quarter pelo id' })
  @ApiOkResponse({ description: 'Quarter excluído com sucesso' })
  @ApiNotFoundResponse({
    description: 'Não foi encontrado um quarter com o ID informado',
  })
  async deleteQuarter(@Param('id') id: string) {
    await this.quartersService.deleteQuarter(id);
    return { message: 'Quarter excluído com sucesso' };
  }
}

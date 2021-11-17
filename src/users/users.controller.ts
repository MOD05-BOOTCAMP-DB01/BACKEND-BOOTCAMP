import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Objective } from 'src/objectives/objective.entity';

@ApiTags('User')
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @ApiCreatedResponse({description: 'Usuário cadastrado com sucesso'})
  @ApiUnprocessableEntityResponse({description: 'As senhas não conferem'})
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);

    return {
      user,
      message: 'Usuário cadastrado com sucesso',
    };
  }

  @Post('/adm')
  @Role(UserRole.ADMIN)
  @ApiCreatedResponse({description: 'Administrador cadastrado com sucesso'})
  @ApiUnprocessableEntityResponse({description: 'As senhas não conferem'})
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Post('/manager')
  @Role(UserRole.ADMIN)
  @ApiCreatedResponse({description: 'Gestor cadastrado com sucesso'})
  @ApiUnprocessableEntityResponse({description: 'As senhas não conferem'})
  async createManagerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createManagerUser(createUserDto);
    return {
      user,
      message: 'Gestor cadastrado com sucesso',
    };
  }

  @Get()
  @ApiOkResponse({description: 'Sucesso'})
  @ApiBearerAuth()
  @ApiDefaultResponse({type: User})
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/objectives/:id')
  @ApiOkResponse({description: 'Sucesso'})
  @ApiNotFoundResponse({description: 'Usuário não possui objetivos'})
  async findObjectiveByUser(@Param('id') id: string) {
    return await this.usersService.findObjectiveByUser(id);
  }

  @Get('/key_results/:id')
  @ApiOkResponse({description: 'Sucesso'})
  @ApiNotFoundResponse({description: 'Usuário não possui resultados-chave'})
  async findKeyResultByUser(@Param('id') id: string) {
    return await this.usersService.findKeyResultByUser(id);
  }

  @Get('/:id')
  @ApiOkResponse({description: 'Sucesso'})
  async findOne(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findOne(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch('/:id')
  @ApiOkResponse({description: 'Usuário atualizado com sucesso'})
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id != id)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete('/:id')
  @Role(UserRole.ADMIN)
  @ApiOkResponse({description: 'Usuário excluído com sucesso'})
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { message: 'Usuário excluído com sucesso' };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { ReturnUserDto } from './dto/return-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);

    return { user, message: 'Úsuario cadastrado com sucesso' };
  }

  @Get('getAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    /* @GetUser() user: User, */
    @Param('id') id: string,
  ) {
    /* if (user.role != UserRole.ADMIN && user.id != id)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
    } */
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(+id);
    return { message: 'Usuário excluído com sucesso' };
  }
}

import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
  Param,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from '../auth/dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { ChangePasswordDto } from '../auth/dtos/change-password.dto';
import { UserRole } from 'src/users/user-roles.enum';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({description: 'Cadastro realizado com sucesso'})
  async signup(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.signup(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  @ApiOkResponse({description: 'Login realizado com sucesso'})
  @ApiUnauthorizedResponse({description: 'Credenciais inválidas'})
  async signin(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signin(credentialsDto);
  }

  @Get('/recover-token/:id')
  @ApiOkResponse({description: 'Sucesso'})
  @ApiUnauthorizedResponse({description: 'Você não tem permissão para realizar essa atividade'})
  @UseGuards(AuthGuard())
  async recoverToken(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<{ recoverToken: string }> {
    if (user.role != UserRole.ADMIN && user.id != id)
      throw new UnauthorizedException(
        'Você não tem permissão para realizar essa atividade',
      );

    return await this.authService.recoverToken(id);
  }

  @Patch('/reset-password/:token')
  @ApiOkResponse({description: 'Senha alterada com sucesso'})
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, changePasswordDto);
    return { message: 'Senha alterada com sucesso!' };
  }

  @Patch('/change-password/:id')
  @ApiOkResponse({description: 'Senha alterada com sucesso'})
  @ApiUnauthorizedResponse({description: 'Você não tem permissão para realizar essa atividade'})
  @UseGuards(AuthGuard())
  async changePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role != UserRole.ADMIN && user.id != id)
      throw new UnauthorizedException(
        'Você não tem permissão para realizar essa atividade',
      );

    await this.authService.changePassword(id, changePasswordDto);
    return {
      message: 'Senha alterada com sucesso!',
    };
  }
}

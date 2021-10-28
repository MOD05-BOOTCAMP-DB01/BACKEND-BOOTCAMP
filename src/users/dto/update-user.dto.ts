import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no maximo 100 caracteres' })
  @MinLength(3, { message: 'O nome deve conter no minimo 3 caracteres' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido.' })
  @MaxLength(100, { message: 'O email deve conter no maximo 100 caracteres.' })
  email: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido.' })
  @MaxLength(100, { message: 'O email deve conter no maximo 100 caracteres.' })
  confirmationEmail: string;

  @IsOptional()
  @MaxLength(100, { message: 'A senha deve ter no maximo 100 caracteres' })
  @MinLength(8, { message: 'A senha deve conter no minimo 8 caracteres' })
  password: string;

  @IsOptional()
  @MaxLength(100, {
    message: 'A senha deve ter no maximo 100 caracteres e ser igual a senha.',
  })
  @MinLength(8, {
    message: 'A senha deve conter no minimo 8 caracteres  e se igual a senha.',
  })
  confirmationPassword: string;

  @IsOptional()
  role: string;

  @IsOptional()
  Status: boolean;
}

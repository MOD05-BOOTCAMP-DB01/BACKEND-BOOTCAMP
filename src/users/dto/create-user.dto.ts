import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';
export class CreateUserDto {
  @IsOptional()
  id: number;

  @IsNotEmpty({
    message: 'Informe um nome.',
  })
  @MaxLength(100, { message: 'O nome deve ter no maximo 100 caracteres' })
  @MinLength(3, { message: 'O nome deve conter no minimo 3 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Informe um endereço de e-mail.' })
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido.' })
  @MaxLength(100,{message: 'O email deve conter no maximo 100 caracteres.' })
  email: string;

  @IsNotEmpty({
    message: 'Informe um endereço de e-mail igual ao campo email.',
  })
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido.' })
  @MaxLength(100,{message: 'O email deve conter no maximo 100 caracteres.' })
  confirmationEmail: string;

  @IsNotEmpty({
    message: 'Informe uma senha contendo letras, numeros e símbulos.',
  })
  @MaxLength(100, { message: 'A senha deve ter no maximo 100 caracteres' })
  @MinLength(8, { message: 'A senha deve conter no minimo 8 caracteres' })
  password: string;

  @IsNotEmpty({
    message: 'A confirmação da senha deve ser iguais.',
  })
  @MaxLength(100, { message: 'A senha deve ter no maximo 100 caracteres' })
  @MinLength(8, { message: 'A senha deve conter no minimo 8 caracteres' })
  confirmationPassword: string;

  @IsNotEmpty({
    message: 'Informe uma role valida.',
  })
  role: string;

  @IsOptional()
  Status: boolean;
}

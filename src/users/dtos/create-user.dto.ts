import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um nome de usuário' })
  @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @IsString({ message: 'Informe uma senha válida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  password: string;

  @IsNotEmpty({ message: 'Informe a senha de confimação' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @IsString({ message: 'Informe uma senha válida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  passwordConfirmation: string;
}

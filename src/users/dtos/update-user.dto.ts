import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString({ message: 'Informe um nome de usuário válido' })
  @ApiProperty()
  username: string;

  @IsOptional()
  @ApiProperty({enum: ['ADMIN', 'MANAGER', 'USER']})
  role: UserRole;

  @IsOptional()
  @ApiProperty()
  status: boolean;
}

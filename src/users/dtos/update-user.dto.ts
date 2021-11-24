import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Team } from 'src/teams/team.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @ApiPropertyOptional({ description: 'E-mail do usuário' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Informe um nome de usuário válido' })
  @ApiPropertyOptional({
    description: 'Nome ou identificação do usuário para acesso',
  })
  username: string;

  @IsOptional()
  @ApiPropertyOptional({
    enum: ['ADMIN', 'MANAGER', 'USER'],
    description: 'Papel do usuário. Nível de privilégios do utilizador',
  })
  role: UserRole;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Atividade do usuário' })
  status: boolean;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Time do usuário' })
  team: Team;
}

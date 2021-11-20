import { IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Team } from 'src/teams/team.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateObjectiveDto {
  @IsOptional()
  @ApiProperty({ description: 'Especificar objetivo' })
  objective: string;

  @IsOptional()
  @ApiProperty({ description: 'Tipo de objetivo' })
  type: string;

  @IsOptional()
  @ApiProperty({ description: 'Data inicial' })
  initial_date: string;

  @IsOptional()
  @ApiProperty({ description: 'Data final' })
  end_date: string;

  @IsOptional()
  @ApiProperty()
  unity: string;

  @IsOptional()
  @ApiProperty()
  area: string;

  @IsOptional()
  @ApiProperty()
  owner: User;

  @IsOptional()
  @ApiProperty()
  team: Team;

  @IsOptional()
  @ApiProperty()
  year: string;

  @IsOptional()
  @ApiProperty()
  quarter: string;
}

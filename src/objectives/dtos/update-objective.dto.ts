import { IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Team } from 'src/teams/team.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Year } from 'src/years/year.entity';
import { Quarter } from 'src/quarters/quarter.entity';

export class UpdateObjectiveDto {
  @IsOptional()
  @ApiPropertyOptional({ description: 'Especificar objetivo' })
  objective: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Tipo de objetivo' })
  type: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Data inicial' })
  initial_date: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Data final' })
  end_date: string;

  @IsOptional()
  @ApiPropertyOptional()
  unity: string;

  @IsOptional()
  @ApiPropertyOptional()
  area: string;

  @IsOptional()
  @ApiPropertyOptional()
  owner: User;

  @IsOptional()
  @ApiPropertyOptional()
  team: Team;

  @IsOptional()
  @ApiPropertyOptional()
  year: Year;

  @IsOptional()
  @ApiPropertyOptional()
  quarter: Quarter;
}

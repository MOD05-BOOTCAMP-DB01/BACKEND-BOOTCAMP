import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';

export class UpdateKeyResultDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Especificar resultado-chave' })
  key_result: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Tipo de resultado-chave' })
  type: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Frequência de mensuração' })
  frequency: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Classificação de prioridade' })
  rating: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Valor inicial' })
  initial_value: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Meta prevista' })
  goal_value: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Valor atual em porcentagem' })
  status: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Comentários extras' })
  comment: string;

  @IsOptional()
  @ApiPropertyOptional()
  done: boolean;

  @IsOptional()
  owner: User;

  @IsOptional()
  objective: Objective;

  @IsOptional()
  color: string;

  @IsOptional()
  moonshot: string;
}

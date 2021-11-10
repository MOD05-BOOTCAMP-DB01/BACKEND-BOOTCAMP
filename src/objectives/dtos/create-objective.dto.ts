import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { KeyResult } from 'src/key-results/key-result.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um objetivo' })
  @ApiProperty()
  objective: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um tipo' })
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data inicial' })
  @ApiProperty()
  initial_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data final' })
  @ApiProperty()
  end_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma unidade' })
  @ApiProperty()
  unity: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma área' })
  @ApiProperty()
  area: string;

  @IsNotEmpty({ message: 'Informe um proprietário' })
  @ApiProperty()
  owner: User;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  key_results: KeyResult[];

  @IsOptional()
  @ApiProperty()
  objective_related: Objective;
}

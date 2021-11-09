import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { KeyResult } from 'src/key-results/key-result.entity';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um objetivo' })
  objective: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um tipo' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data inicial' })
  initial_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data final' })
  end_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma unidade' })
  unity: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma área' })
  area: string;

  @IsNotEmpty({ message: 'Informe um proprietário' })
  owner: User;

  @IsArray()
  @IsOptional()
  key_results: KeyResult[];

  @IsOptional()
  objective_related: Objective;
}

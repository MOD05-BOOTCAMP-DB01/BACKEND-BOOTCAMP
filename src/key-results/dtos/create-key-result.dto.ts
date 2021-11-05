import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { Checkin } from 'src/checkin/checkin.entity';

export class CreateKeyResultDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um resultado-chave' })
  key_result: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o tipo do resultado-chave' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a frequência' })
  frequency: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a classificação' })
  rating: string;

  @IsNumber()
  @IsOptional()
  initial_value: number;

  @IsNumber()
  @IsOptional()
  goal_value: number;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsString()
  @IsOptional()
  comment: string;

  @IsBoolean()
  done: boolean;

  owner: User;

  objectives: Objective[];

  checkin: Checkin[];
}

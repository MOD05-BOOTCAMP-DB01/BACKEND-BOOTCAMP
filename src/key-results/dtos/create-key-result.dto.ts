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
import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyResultDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um resultado-chave' })
  @ApiProperty()
  key_result: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o tipo do resultado-chave' })
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a frequência' })
  @ApiProperty()
  frequency: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a classificação' })
  @ApiProperty()
  rating: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Informe o valor inicial' })
  @ApiProperty()
  initial_value: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Informe o valor da meta' })
  @ApiProperty()
  goal_value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  comment: string;

  @IsBoolean()
  @ApiProperty()
  done: boolean;

  owner: User;

  objective: Objective;

  checkin: Checkin[];
}

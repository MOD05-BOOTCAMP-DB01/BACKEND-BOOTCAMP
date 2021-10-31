import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';

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

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  @IsOptional()
  initial_value: number;

  @IsNumber()
  @IsOptional()
  goal_value: number;

  @IsString()
  @IsOptional()
  comment: string;

  owner: User;
}

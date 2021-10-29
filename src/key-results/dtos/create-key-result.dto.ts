import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsNotEmpty({ message: 'Informe um responsável' })
  owner: string;

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
}

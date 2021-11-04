import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Checkin } from 'src/checkin/checkin.entity';

export class UpdateKeyResultDto {
  @IsString()
  @IsOptional()
  key_result: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  frequency: string;

  @IsString()
  @IsOptional()
  owner: string;

  @IsString()
  @IsOptional()
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

  @IsOptional()
  concluido: boolean;

  @IsOptional()
  checkin: Checkin[];
}

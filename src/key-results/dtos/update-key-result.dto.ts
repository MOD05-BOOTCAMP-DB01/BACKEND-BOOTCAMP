import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

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
  @IsOptional()
  done: boolean;
}

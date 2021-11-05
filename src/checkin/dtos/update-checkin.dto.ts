import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCheckinDto {
  @IsString()
  @IsOptional()
  date: string;

  @IsNumber()
  @IsOptional()
  current_value: number;
}

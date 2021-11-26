import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCheckinDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  date: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  current_value: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  comment: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  color: string;
}

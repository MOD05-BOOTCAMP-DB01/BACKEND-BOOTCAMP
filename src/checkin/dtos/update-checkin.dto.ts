import { IsString, IsOptional } from 'class-validator';

export class UpdateCheckinDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  valorAtual: string;
}

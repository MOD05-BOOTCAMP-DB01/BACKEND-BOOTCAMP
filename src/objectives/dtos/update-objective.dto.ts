import { IsOptional } from 'class-validator';

export class UpdateObjectiveDto {
  @IsOptional()
  objective: string;

  @IsOptional()
  type: string;

  @IsOptional()
  initial_date: string;

  @IsOptional()
  end_date: string;

  @IsOptional()
  unity: string;

  @IsOptional()
  area: string;

  @IsOptional()
  owner: string;
}

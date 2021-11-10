import { IsOptional } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class UpdateObjectiveDto {
  @IsOptional()
  @ApiProperty()
  objective: string;

  @IsOptional()
  @ApiProperty()
  type: string;

  @IsOptional()
  @ApiProperty()
  initial_date: string;

  @IsOptional()
  @ApiProperty()
  end_date: string;

  @IsOptional()
  @ApiProperty()
  unity: string;

  @IsOptional()
  @ApiProperty()
  area: string;
}

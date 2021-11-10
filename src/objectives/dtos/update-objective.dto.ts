import { IsOptional } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class UpdateObjectiveDto {
  @IsOptional()
  @ApiProperty({description: 'Especificar objetivo'})
  objective: string;

  @IsOptional()
  @ApiProperty({description: 'Tipo de objetivo'})
  type: string;

  @IsOptional()
  @ApiProperty({description: 'Data inicial'})
  initial_date: string;

  @IsOptional()
  @ApiProperty({description: 'Data final'})
  end_date: string;

  @IsOptional()
  @ApiProperty()
  unity: string;

  @IsOptional()
  @ApiProperty()
  area: string;
}

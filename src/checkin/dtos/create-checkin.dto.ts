import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { KeyResult } from 'src/key-results/key-result.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckinDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe uma data' })
  @ApiProperty()
  date: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Informe o valor atual' })
  @ApiProperty()
  current_value: number;

  @IsNotEmpty({ message: 'Informe o ID de um Resultado-chave' })
  @ApiProperty()
  key_result: KeyResult;
}

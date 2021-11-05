import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { KeyResult } from 'src/key-results/key-result.entity';

export class CreateCheckinDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe uma data' })
  date: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Informe o valor atual' })
  current_value: number;

  @IsNotEmpty({ message: 'Informe o ID de um Resultado-chave' })
  key_result: KeyResult;
}

import { IsString, IsNotEmpty } from 'class-validator';
import { KeyResult } from 'src/key-results/key-result.entity';
import { Checkin } from '../checkin.entity';

export class CreateCheckinDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um status' })
  valorAtual: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data' })
  date: string;


  key_results: KeyResult;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCheckinDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um status' })
  status: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data' })
  date: string;
}

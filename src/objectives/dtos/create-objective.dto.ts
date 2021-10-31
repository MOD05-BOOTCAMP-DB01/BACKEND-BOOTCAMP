import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um objetivo' })
  objective: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe um tipo' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data inicial' })
  initial_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma data final' })
  end_date: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma unidade' })
  unity: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma área' })
  area: string;

  owner: User;
}

import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class UpdateKeyResultDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  key_result: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  frequency: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  rating: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  initial_value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  goal_value: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  status: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  comment: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  done: boolean;
}

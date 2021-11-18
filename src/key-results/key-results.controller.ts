import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { CreateKeyResultDto } from './dtos/create-key-result.dto';
import { ReturnKeyResultDto } from './dtos/return-key-result.dto';
import { UpdateKeyResultDto } from './dtos/update-key-result.dto';
import { AuthGuard } from '@nestjs/passport';
import { KeyResultsService } from './key-results.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('key-results')
@UseGuards(AuthGuard())
export class KeyResultsController {
  constructor(private keyResultsService: KeyResultsService) {}

  @Post()
  async createKeyResult(
    @Body(ValidationPipe) createKeyResultDto: CreateKeyResultDto,
  ): Promise<ReturnKeyResultDto> {
    const keyResult = await this.keyResultsService.createKeyResult(
      createKeyResultDto,
    );
    return {
      keyResult,
      message: 'Resultado-chave cadastrado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return this.keyResultsService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ReturnKeyResultDto> {
    const keyResult = await this.keyResultsService.findOne(id);
    return {
      keyResult,
      message: 'Resultado-chave encontrado',
    };
  }

  @Patch('/:id')
  async updateKeyResult(
    @Body(ValidationPipe) updateKeyResultDto: UpdateKeyResultDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    return this.keyResultsService.updateKeyResult(updateKeyResultDto, id);
  }

  @Delete('/:id')
  async deleteKeyResult(@Param('id') id: string) {
    await this.keyResultsService.deleteKeyResult(id);
    return { message: 'Resultado-chave excluído com sucesso' };
  }
}

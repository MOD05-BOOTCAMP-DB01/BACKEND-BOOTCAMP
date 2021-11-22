import { Controller, Get } from '@nestjs/common';
import { YearsService } from './years.service';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Years')
@Controller('years')
export class YearsController {
  constructor(private yearsService: YearsService) {}

  @Get()
  @ApiOperation({ summary: 'Busca todos os anos' })
  @ApiOkResponse({ description: 'Sucesso' })
  async findYear() {
    return this.yearsService.findYear();
  }
}

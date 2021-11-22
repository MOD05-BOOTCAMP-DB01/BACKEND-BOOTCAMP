import { Module } from '@nestjs/common';
import { YearsController } from './years.controller';
import { YearsService } from './years.service';

@Module({
  controllers: [YearsController],
  providers: [YearsService],
})
export class YearsModule {}

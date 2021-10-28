import { Module } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { ObjectivesController } from './objectives.controller';

@Module({
  providers: [ObjectivesService],
  controllers: [ObjectivesController],
})
export class ObjectivesModule {}

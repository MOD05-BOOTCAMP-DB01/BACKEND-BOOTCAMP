import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ObjectivesModule } from './objectives/objectives.module';
import { KeyResultsModule } from './key-results/key-results.module';
import { CheckinModule } from './checkin/checkin.module';

@Module({
  imports: [AuthModule, ObjectivesModule, KeyResultsModule, CheckinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

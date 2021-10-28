import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ObjectivesModule } from './objectives/objectives.module';
import { KeyResultsModule } from './key-results/key-results.module';
import { CheckinModule } from './checkin/checkin.module';

@Module({
  imports: [AuthModule, ObjectivesModule, KeyResultsModule, CheckinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

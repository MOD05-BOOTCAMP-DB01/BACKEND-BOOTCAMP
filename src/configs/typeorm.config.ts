import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  url: 'postgres://islnkpnx:bVU2Iiuojt5yHvuN79W6hRFJ9vB9_fo1@kesavan.db.elephantsql.com/islnkpnx',
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

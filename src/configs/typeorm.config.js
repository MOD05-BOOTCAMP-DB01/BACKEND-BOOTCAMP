"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'okr',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
};

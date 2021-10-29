"use strict";
exports.__esModule = true;
exports.winstonConfig = void 0;
var nest_winston_1 = require("nest-winston");
var winston = require("winston");
exports.winstonConfig = {
    levels: winston.config.npm.levels,
    level: 'verbose',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike())
        }),
        new winston.transports.File({
            level: 'verbose',
            filename: 'application.log',
            dirname: 'logs'
        }),
    ]
};

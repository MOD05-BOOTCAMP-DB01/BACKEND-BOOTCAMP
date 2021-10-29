"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_config_1 = require("./configs/typeorm.config");
var users_module_1 = require("./users/users.module");
var auth_module_1 = require("./auth/auth.module");
var logger_interceptor_1 = require("./interceptors/logger.interceptor");
var core_1 = require("@nestjs/core");
var nest_winston_1 = require("nest-winston");
var winston_config_1 = require("./configs/winston.config");
var objectives_module_1 = require("./objectives/objectives.module");
var key_results_module_1 = require("./key-results/key-results.module");
var checkin_module_1 = require("./checkin/checkin.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
                nest_winston_1.WinstonModule.forRoot(winston_config_1.winstonConfig),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                objectives_module_1.ObjectivesModule,
                key_results_module_1.KeyResultsModule,
                checkin_module_1.CheckinModule,
            ],
            controllers: [],
            providers: [
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: logger_interceptor_1.LoggerInterceptor
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

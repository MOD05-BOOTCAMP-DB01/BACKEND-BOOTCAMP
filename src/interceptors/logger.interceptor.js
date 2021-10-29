"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.LoggerInterceptor = void 0;
var common_1 = require("@nestjs/common");
var LoggerInterceptor = /** @class */ (function () {
    function LoggerInterceptor(logger) {
        this.logger = logger;
    }
    LoggerInterceptor.prototype.intercept = function (context, next) {
        this.log(context.switchToHttp().getRequest());
        return next.handle();
    };
    LoggerInterceptor.prototype.log = function (req) {
        var body = __assign({}, req.body);
        delete body.password;
        delete body.confirmationPassword;
        var userEmail = req.email;
        this.logger.info('Log', {
            timestamp: new Date().toISOString(),
            method: req.method,
            route: req.route.path,
            data: {
                body: body,
                query: req.query,
                params: req.params
            },
            from: req.ip,
            madeBy: userEmail
        });
    };
    LoggerInterceptor = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)('winston'))
    ], LoggerInterceptor);
    return LoggerInterceptor;
}());
exports.LoggerInterceptor = LoggerInterceptor;

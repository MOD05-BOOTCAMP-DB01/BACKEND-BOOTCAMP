"use strict";
exports.__esModule = true;
exports.GetUser = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../users/user.entity");
exports.GetUser = (0, common_1.createParamDecorator)(function (data, req) {
    var user = req.args[0].user;
    return user;
});

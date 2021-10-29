"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var roles_guard_1 = require("../auth/roles.guard");
var role_decorator_1 = require("../auth/role.decorator");
var user_roles_enum_1 = require("./user-roles.enum");
var get_user_decorator_1 = require("../auth/get-user.decorator");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.createUser = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.createUser(createUserDto)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                message: 'Úsuario cadastrado com sucesso'
                            }];
                }
            });
        });
    };
    UsersController.prototype.createAdminUser = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.createAdminUser(createUserDto)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                message: 'Administrador cadastrado com sucesso'
                            }];
                }
            });
        });
    };
    UsersController.prototype.createManagerUser = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.createManagerUser(createUserDto)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                message: 'Gestor cadastrado com sucesso'
                            }];
                }
            });
        });
    };
    UsersController.prototype.findAll = function () {
        return this.usersService.findAll();
    };
    UsersController.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOne(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                message: 'Usuário encontrado'
                            }];
                }
            });
        });
    };
    UsersController.prototype.updateUser = function (updateUserDto, user, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (user.role != user_roles_enum_1.UserRole.ADMIN && user.id != id)
                    throw new common_1.ForbiddenException('Você não tem autorização para acessar esse recurso');
                else {
                    return [2 /*return*/, this.usersService.updateUser(updateUserDto, id)];
                }
                return [2 /*return*/];
            });
        });
    };
    UsersController.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.deleteUser(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Usuário excluído com sucesso' }];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], UsersController.prototype, "createUser");
    __decorate([
        (0, common_1.Post)('/adm'),
        (0, role_decorator_1.Role)(user_roles_enum_1.UserRole.ADMIN),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], UsersController.prototype, "createAdminUser");
    __decorate([
        (0, common_1.Post)('/adm'),
        (0, role_decorator_1.Role)(user_roles_enum_1.UserRole.ADMIN),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], UsersController.prototype, "createManagerUser");
    __decorate([
        (0, common_1.Get)()
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)('/:id'),
        (0, role_decorator_1.Role)(user_roles_enum_1.UserRole.ADMIN),
        __param(0, (0, common_1.Param)('id'))
    ], UsersController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)('/:id'),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
        __param(1, (0, get_user_decorator_1.GetUser)()),
        __param(2, (0, common_1.Param)('id'))
    ], UsersController.prototype, "updateUser");
    __decorate([
        (0, common_1.Delete)('/:id'),
        (0, role_decorator_1.Role)(user_roles_enum_1.UserRole.ADMIN),
        __param(0, (0, common_1.Param)('id'))
    ], UsersController.prototype, "deleteUser");
    UsersController = __decorate([
        (0, common_1.Controller)('users'),
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard)
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;

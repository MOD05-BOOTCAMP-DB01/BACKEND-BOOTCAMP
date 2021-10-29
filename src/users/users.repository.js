"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserRepository = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var bcrypt = require("bcrypt");
var common_1 = require("@nestjs/common");
var UserRepository = /** @class */ (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRepository.prototype.createUser = function (createUserDto, role) {
        return __awaiter(this, void 0, void 0, function () {
            var email, username, password, user, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        email = createUserDto.email, username = createUserDto.username, password = createUserDto.password;
                        user = this.create();
                        user.email = email;
                        user.username = username;
                        _a = user;
                        return [4 /*yield*/, this.hashPassword(password, user.salt)];
                    case 1:
                        _a.password = _c.sent();
                        user.role = role;
                        user.status = true;
                        _b = user;
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        _b.salt = _c.sent();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _c.sent();
                        delete user.password;
                        delete user.salt;
                        return [2 /*return*/, user];
                    case 5:
                        error_1 = _c.sent();
                        if (error_1.code.toString() === '23505') {
                            throw new common_1.ConflictException('Endereço de e-mail já está em uso!');
                        }
                        else {
                            throw new common_1.InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.findUsers = function (queryDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, username, status, role, query, _a, users, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
                        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
                        queryDto.status = queryDto.status === undefined ? true : queryDto.status;
                        email = queryDto.email, username = queryDto.username, status = queryDto.status, role = queryDto.role;
                        query = this.createQueryBuilder('user');
                        query.where('user.status = :status', { status: status });
                        if (email) {
                            query.andWhere('user.email ILIKE :email', { email: "%" + email + "%" });
                        }
                        if (username) {
                            query.andWhere('user.username ILIKE :username', {
                                username: "%" + username + "%"
                            });
                        }
                        if (role) {
                            query.andWhere('user.role ILIKE :role', { role: role });
                        }
                        query.skip((queryDto.page - 1) * queryDto.limit);
                        query.take(queryDto.limit);
                        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
                        query.select(['user.username', 'user.email', 'user.role', 'user.status']);
                        return [4 /*yield*/, query.getManyAndCount()];
                    case 1:
                        _a = _b.sent(), users = _a[0], total = _a[1];
                        return [2 /*return*/, { users: users, total: total }];
                }
            });
        });
    };
    UserRepository.prototype.changePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        user = _c.sent();
                        _a = user;
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        _a.salt = _c.sent();
                        _b = user;
                        return [4 /*yield*/, this.hashPassword(password, user.salt)];
                    case 3:
                        _b.password = _c.sent();
                        user.recoverToken = null;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.checkCredentials = function (credentialsDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = credentialsDto.email, password = credentialsDto.password;
                        return [4 /*yield*/, this.findOne({ email: email, status: true })];
                    case 1:
                        user = _b.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, user.checkPassword(password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.hashPassword = function (password, salt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.hash(password, salt)];
            });
        });
    };
    UserRepository = __decorate([
        (0, typeorm_1.EntityRepository)(user_entity_1.User)
    ], UserRepository);
    return UserRepository;
}(typeorm_1.Repository));
exports.UserRepository = UserRepository;

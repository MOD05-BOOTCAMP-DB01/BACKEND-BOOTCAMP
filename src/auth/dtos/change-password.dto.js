"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordDto = void 0;
var class_validator_1 = require("class-validator");
var ChangePasswordDto = /** @class */ (function () {
    function ChangePasswordDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Informe uma senha' }),
        (0, class_validator_1.MinLength)(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
        (0, class_validator_1.MaxLength)(32, { message: 'A senha deve ter no máximo 32 caracteres' }),
        (0, class_validator_1.IsString)({ message: 'Informe uma senha válida' }),
        (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
        })
    ], ChangePasswordDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Informe uma senha' }),
        (0, class_validator_1.MinLength)(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
        (0, class_validator_1.MaxLength)(32, { message: 'A senha deve ter no máximo 32 caracteres' }),
        (0, class_validator_1.IsString)({ message: 'Informe uma senha válida' }),
        (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
        })
    ], ChangePasswordDto.prototype, "passwordConfirmation");
    return ChangePasswordDto;
}());
exports.ChangePasswordDto = ChangePasswordDto;

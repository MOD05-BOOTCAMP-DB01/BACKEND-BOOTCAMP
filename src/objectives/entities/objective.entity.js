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
exports.__esModule = true;
exports.Objective = void 0;
var typeorm_1 = require("typeorm");
var Objective = /** @class */ (function (_super) {
    __extends(Objective, _super);
    function Objective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Objective.prototype, "objectiveId");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 120 })
    ], Objective.prototype, "objective");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 50 })
    ], Objective.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 100 })
    ], Objective.prototype, "initialDate");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 50 })
    ], Objective.prototype, "endDate");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 50 })
    ], Objective.prototype, "area");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 50 })
    ], Objective.prototype, "unity");
    Objective = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)([])
    ], Objective);
    return Objective;
}(typeorm_1.BaseEntity));
exports.Objective = Objective;

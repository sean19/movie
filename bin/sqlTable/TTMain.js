"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTMain = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TTMain = class TTMain extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Length)({ min: 1, max: 11, msg: 'wrong length' }),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TTMain.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_name_1", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_year", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_area", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_lan", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "mv_imdb", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "title_sub", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TTMain.prototype, "href", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TTMain.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TTMain.prototype, "update_time", void 0);
TTMain = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "t_TT_main" })
], TTMain);
exports.TTMain = TTMain;
//# sourceMappingURL=TTMain.js.map
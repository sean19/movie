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
exports.TConfigPage = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TConfigPage = class TConfigPage extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Length)({ min: 1, max: 11, msg: 'wrong length' }),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TConfigPage.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigPage.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigPage.prototype, "json", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigPage.prototype, "platform", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigPage.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TConfigPage.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TConfigPage.prototype, "update_time", void 0);
TConfigPage = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "t_config_page" })
], TConfigPage);
exports.TConfigPage = TConfigPage;
//# sourceMappingURL=TConfigPage.js.map
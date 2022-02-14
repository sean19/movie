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
exports.TConfigSelector = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TConfigSelector = class TConfigSelector extends sequelize_typescript_1.Model {
    getattribsarr() {
        return JSON.parse(this.attribs);
    }
};
__decorate([
    (0, sequelize_typescript_1.Length)({ min: 1, max: 11, msg: 'wrong length' }),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TConfigSelector.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigSelector.prototype, "info", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigSelector.prototype, "url", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigSelector.prototype, "datatype", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigSelector.prototype, "selector", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigSelector.prototype, "attribs", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TConfigSelector.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TConfigSelector.prototype, "update_time", void 0);
TConfigSelector = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "t_config_selector" })
], TConfigSelector);
exports.TConfigSelector = TConfigSelector;
//# sourceMappingURL=TConfigSelector.js.map
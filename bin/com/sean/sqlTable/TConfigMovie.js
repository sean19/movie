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
exports.TConfigMovie = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TConfigMovie = class TConfigMovie extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Length)({ min: 1, max: 11, msg: 'wrong length' }),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TConfigMovie.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigMovie.prototype, "platformid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigMovie.prototype, "pname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigMovie.prototype, "host", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigMovie.prototype, "searchstr", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigMovie.prototype, "searchinfo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TConfigMovie.prototype, "playlist", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TConfigMovie.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TConfigMovie.prototype, "update_time", void 0);
TConfigMovie = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "t_config_movie" })
], TConfigMovie);
exports.TConfigMovie = TConfigMovie;
//# sourceMappingURL=TConfigMovie.js.map
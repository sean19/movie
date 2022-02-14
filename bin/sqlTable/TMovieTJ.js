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
exports.TMovieTJ = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TMovieTJ = class TMovieTJ extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Length)({ min: 1, max: 11, msg: 'wrong length' }),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TMovieTJ.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TMovieTJ.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TMovieTJ.prototype, "platform", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TMovieTJ.prototype, "movieurl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TMovieTJ.prototype, "movieOrgurl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TMovieTJ.prototype, "tjm", void 0);
TMovieTJ = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "t_movie_tj" })
], TMovieTJ);
exports.TMovieTJ = TMovieTJ;
//# sourceMappingURL=TMovieTJ.js.map
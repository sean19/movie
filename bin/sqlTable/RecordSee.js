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
var RecordSee_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordSee = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let RecordSee = RecordSee_1 = class RecordSee extends sequelize_typescript_1.Model {
    static async checkRecord(type, keywd, ip) {
        keywd = keywd.replace(';', '');
        keywd = keywd.replace(',', '');
        var rc = await RecordSee_1.findOne({ where: { ip: ip, type: type } });
        if (rc) {
            rc.keyword = RecordSee_1.addKeyWord(rc.keyword, keywd);
            rc.up_time = new Date();
        }
        else {
            rc = new RecordSee_1();
            rc.cr_time = rc.up_time = new Date();
            rc.ip = ip;
            rc.keyword = keywd + "," + 1;
            rc.type = type;
        }
        await rc.save();
    }
    static addKeyWord(keys, keyword) {
        var newkeys = "";
        var arrkeys = keys.split(';');
        arrkeys = RecordSee_1.updateKeywords(arrkeys, keyword);
        if (arrkeys.length > 50)
            arrkeys.shift();
        for (var i = 0; i < arrkeys.length; i++) {
            newkeys += (i == 0 ? "" : ';') + arrkeys[i];
        }
        newkeys = (newkeys.length > 1000 ? newkeys.substring(newkeys.length - 100, newkeys.length) : newkeys);
        return newkeys;
    }
    static updateKeywords(arrkeys, keyword) {
        var isnew = true;
        for (var i = 0; i < arrkeys.length; i++) {
            var strarr = arrkeys[i].split(',');
            if (strarr[0] == keyword) {
                var num = parseInt(strarr[1]) + 1;
                arrkeys[i] = keyword + ',' + num;
                isnew = false;
            }
        }
        if (isnew) {
            arrkeys.push(keyword + ',' + 1);
        }
        return arrkeys;
    }
};
__decorate([
    (0, sequelize_typescript_1.Length)({ min: 1, max: 11, msg: 'wrong length' }),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], RecordSee.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RecordSee.prototype, "ip", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RecordSee.prototype, "keyword", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RecordSee.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], RecordSee.prototype, "cr_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], RecordSee.prototype, "up_time", void 0);
RecordSee = RecordSee_1 = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "t_TT_see_record" })
], RecordSee);
exports.RecordSee = RecordSee;
//# sourceMappingURL=RecordSee.js.map
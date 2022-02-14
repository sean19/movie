"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysEnumEvent = void 0;
var SysEnumEvent;
(function (SysEnumEvent) {
    SysEnumEvent[SysEnumEvent["pool_config_change"] = 1] = "pool_config_change";
    SysEnumEvent[SysEnumEvent["pool_gold_change"] = 2] = "pool_gold_change";
    SysEnumEvent[SysEnumEvent["player_register"] = 3] = "player_register";
    SysEnumEvent[SysEnumEvent["player_rate_time_save"] = 4] = "player_rate_time_save";
    SysEnumEvent[SysEnumEvent["redis_option_ok"] = 5] = "redis_option_ok";
    SysEnumEvent[SysEnumEvent["redis_option_get"] = 6] = "redis_option_get";
    SysEnumEvent[SysEnumEvent["redis_option_set"] = 7] = "redis_option_set";
    SysEnumEvent[SysEnumEvent["redis_option_smembers"] = 8] = "redis_option_smembers";
    SysEnumEvent[SysEnumEvent["redis_option_del"] = 9] = "redis_option_del";
    SysEnumEvent[SysEnumEvent["redis_init_ok"] = 100] = "redis_init_ok";
    SysEnumEvent[SysEnumEvent["sequelize_init_ok"] = 101] = "sequelize_init_ok";
})(SysEnumEvent = exports.SysEnumEvent || (exports.SysEnumEvent = {}));
//# sourceMappingURL=SysEnumEvent.js.map
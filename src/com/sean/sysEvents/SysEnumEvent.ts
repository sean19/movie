export enum SysEnumEvent
{
    pool_config_change=1,
    pool_gold_change=2,
    player_register=3,
    player_rate_time_save=4,



    redis_option_ok=5,
    redis_option_get=6,
    redis_option_set=7,
    redis_option_smembers=8,
    redis_option_del=9,

    

    redis_init_ok=100,
    sequelize_init_ok=101,
}
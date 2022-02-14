var DataTypes = require("sequelize").DataTypes;
var _t_config_book = require("./t_config_book");

function initModels(sequelize) {
  var t_config_book = _t_config_book(sequelize, DataTypes);


  return {
    t_config_book,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
module.exports = function(sequelize, DataTypes) {
  var foodlog = sequelize.define("foodlog", {
    meal: DataTypes.STRING,
  });
  return foodlog;
};

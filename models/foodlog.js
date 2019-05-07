module.exports = function(sequelize, DataTypes) {
  var meals = sequelize.define("meals", {
    meal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food: {
      type: DataTypes.TEXT,
      allowNull: false,
  }});


  meals.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    meals.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return meals;
};

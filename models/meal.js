module.exports = function(sequelize, DataTypes) {
    var Meal = sequelize.define("Meal", {
      meal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      food: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Meal.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Meal.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Meal;
  };
  
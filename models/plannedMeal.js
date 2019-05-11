module.exports = function(sequelize, DataTypes) {
    var plannedMeal = sequelize.define("plannedMeal", {
      meal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      food: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    plannedMeal.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      plannedMeal.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return plannedMeal;
  };
  
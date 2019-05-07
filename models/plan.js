module.exports = function(sequelize, DataTypes) {
    var plannedmeals = sequelize.define("plannedmeals", {
      meal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      food: {
        type: DataTypes.TEXT,
        allowNull: false,
    }});
  
  
    plannedmeals.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      plannedmeals.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return meals;
  };
  
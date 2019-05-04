module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    user.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      user.hasMany(models.meals, {
        onDelete: "cascade"
      });
    };
  
    return user;
  };
  
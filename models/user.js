module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
      username: {type: DataTypes.STRING, unique: true, validate: {notNull: true, notEmpty: true}},
      password: {type: DataTypes.STRING, validate: {notNull: true, notEmpty: true}}
});
  
    User.associate = function(models) {
      models.User.hasMany(models.meals, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  
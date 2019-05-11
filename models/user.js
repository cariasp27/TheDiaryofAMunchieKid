
module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		username: {type:Sequelize.TEXT},
		password : {type: Sequelize.STRING,allowNull: false },
});

	User.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		User.hasMany(models.Meal, {
		onDelete: "cascade"
		});
	};
	return User;

}
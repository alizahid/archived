module.exports = function(sequelize, DataTypes) {
	const Item = sequelize.define('item', {
		user: {
			type: DataTypes.BIGINT
		},
		account: {
			allowNull: false,
			type: DataTypes.STRING
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING
		},
		amount: {
			allowNull: false,
			type: DataTypes.DECIMAL(10, 2)
		}
	}, {
		freezeTableName: true,
		tableName: 'messenger_items'
	})

	return Item
}

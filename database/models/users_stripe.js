'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersStripe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersStripe.belongsTo(models.Users, {
        as: 'user', foreignKey: 'user_id'
      })
    }
  }
  UsersStripe.init({
    user_id:{
     type: DataTypes.UUID,
     primaryKey: true
    } ,
    client_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'UsersStripe',
    tableName: 'users_stripe',
    underscored: true,
    timestamps: true
  });
  return UsersStripe;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationsPayments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ApplicationsPayments.belongsTo(models.Applications, {
        as: 'application', foreignKey: 'applications_id'
      })
    }
  }
  ApplicationsPayments.init({
    id:{
      type: DataTypes.BIGINT,
      primaryKey: true,
     },
     applications_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    payment_intent: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ApplicationsPayments',
    tableName: 'applications_payments',
    underscored: true,
    timestamps: true
  });
  return ApplicationsPayments;
};
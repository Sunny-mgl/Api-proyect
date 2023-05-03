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
      ApplicationsPayments.belongsTo(models.Applications, {as:'application', foreignKey:'application_id'})
    }
  }
  ApplicationsPayments.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    application_id: {
      type: DataTypes.UUID
    },
    payment_intent: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ApplicationsPayments',
    tableName: 'applications_payments',
    underscored: true,
    timestamps: true
  });
  return ApplicationsPayments;
};
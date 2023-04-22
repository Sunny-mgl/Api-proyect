'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationsPhotos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ApplicationsPhotos.belongsTo(models.Applications, {
        as:'application', foreignKey: 'applications_id'
      })
    }
  }
  ApplicationsPhotos.init({
    applications_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ApplicationsPhotos',
    tableName: 'applications_photos',
    underscored: true,
    timestamps: true
  });
  return ApplicationsPhotos;
};
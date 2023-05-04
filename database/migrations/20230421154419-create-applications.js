
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('applications', {
       user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
       },
       legal_first_names: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      legal_last_names: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nationality: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date_of_birth: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      passport_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      passport_expiration_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      residence: {
        type: Sequelize.STRING,
        allowNull: false
      },
      residence_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      job: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isInt: [
            'draft',
            'confirmed'
          ]
        }
      },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, /*Sequelize*/) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('applications', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
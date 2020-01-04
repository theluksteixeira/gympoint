module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('students', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(256),
                allowNull: false,
                unique: true,
            },
            idade: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            peso: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            altura: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('students');
    },
};

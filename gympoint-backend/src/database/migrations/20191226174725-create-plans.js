module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('plans', {
            id: {
                type: Sequelize.INTEGER,
                allowNulls: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNulls: false,
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNulls: false,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNulls: false,
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
        return queryInterface.dropTable('plans');
    },
};

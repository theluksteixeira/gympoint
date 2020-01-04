module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'checkins',
            [
                {
                    id: 1,
                    student_id: 6,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

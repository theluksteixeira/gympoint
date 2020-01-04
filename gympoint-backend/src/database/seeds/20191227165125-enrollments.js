module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'enrollments',
            [
                {
                    id: 1,
                    student_id: 6,
                    plan_id: 11,
                    start_date: new Date(),
                    end_date: new Date(),
                    price: 129,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'plans',
            [
                {
                    id: 10,
                    title: 'Start',
                    duration: 1,
                    price: 129,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 11,
                    title: 'Gold',
                    duration: 3,
                    price: 109,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 12,
                    title: 'Diamond',
                    duration: 6,
                    price: 89,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

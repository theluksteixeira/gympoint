module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'help_orders',
            [
                {
                    id: 1,
                    student_id: 6,
                    question: 'Posso malhar 7 dias na semana?',
                    answer:
                        'Não é aconselhado malhar esse tempo todo, o corpo deve ter um período de descanso.',
                    answer_at: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

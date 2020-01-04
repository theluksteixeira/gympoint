module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'students',
            [
                {
                    id: 6,
                    nome: 'Aluno 01 - Teste Lucas 01',
                    email: 'aluno01@gmail.com',
                    idade: '30',
                    peso: '70kg',
                    altura: '1.85',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};

import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            idade: Yup.string(),
            peso: Yup.string(),
            altura: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Algum campo falhou na validação.' });
        }

        const { id, nome, email, idade, peso, altura } = await Student.create(
            req.body
        );

        return res.json({
            id,
            nome,
            email,
            idade,
            peso,
            altura,
        });

        // return res.json({ ok: 'okok' });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string()
                .email()
                .required(),
            idade: Yup.string().max(3),
            peso: Yup.string(),
            altura: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Algum campo falhou na validação.' });
        }

        const { id } = req.params;
        const objStudent = await Student.findByPk(id);

        if (!objStudent) {
            return res.status(400).json({
                error: 'Aluno não existe.',
            });
        }

        const { nome, idade, peso, altura, email } = await objStudent.update(
            req.body
        );
        return res.json({
            id,
            nome,
            email,
            idade,
            peso,
            altura,
        });
    }

    async listOne(req, res) {
        const { id } = req.params;
        const student = await Student.findByPk(id);

        if (!student)
            return res.status(404).json({ error: 'Aluno não localizado!' });

        return res.json(student);
    }

    async listAll(req, res) {
        const name = req.query.q || '';
        const page = parseInt(req.query.page || 1, 10);
        const perPage = parseInt(req.query.perPage || 5, 10);

        const students = await Student.findAndCountAll({
            order: ['nome'],
            where: {
                nome: { [Op.like]: `%${name}%` },
            },
            limit: perPage,
            offset: (page - 1) * perPage,
        });

        const totalPage = Math.ceil(students.count / perPage);

        return res.json({
            page,
            perPage,
            data: students.rows,
            total: students.count,
            totalPage,
        });
    }

    async delete(req, res) {
        const { id } = req.params;
        const objStudent = await Student.findByPk(id);

        if (!objStudent)
            return res.status(404).json({ error: 'Aluno não localizado.' });

        try {
            await objStudent.destroy();
            return res.status(200).json({
                Msg: 'Registro removido com sucesso.',
            });
        } catch (err) {
            return res.status(400).json({
                Msg: 'Erro ao remover o registro.',
            });
        }
    }
}

export default new StudentController();

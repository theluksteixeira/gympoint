import * as Yup from 'yup';
import { Op } from 'sequelize';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Algum campo falhou na validação.' });
        }

        const { student_id, plan_id, start_date } = req.body;

        const objStudent = await Student.findByPk(student_id);
        if (!objStudent) {
            return res.status(400).json({
                error: 'Não existe esse aluno em nossa base!',
            });
        }

        const enrollmentExists = await Enrollment.findOne({
            where: { student_id },
        });
        if (enrollmentExists) {
            return res.status(400).json({
                error: 'Esse aluno já está matriculado em um plano!',
            });
        }

        const objPlan = await Plan.findByPk(plan_id);
        if (!objPlan) {
            return res.status(400).json({
                error: 'Plano não existe!',
            });
        }

        const price = objPlan.duration * objPlan.price;
        const end_date = addMonths(parseISO(start_date), objPlan.duration);

        const enrollment = await Enrollment.create({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        return res.json({ enrollment });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Algum campo falhou na validação.' });
        }

        const objEnrollment = await Enrollment.findByPk(req.params.id);
        if (!objEnrollment) {
            return res.status(400).json({
                error: 'Matrícula não localizada!',
            });
        }

        const { student_id, plan_id, start_date } = req.body;

        const objStudent = await Student.findByPk(student_id);
        if (!objStudent) {
            return res.status(400).json({
                error: 'Não existe esse aluno em nossa base!',
            });
        }

        const objPlan = await Plan.findByPk(plan_id);
        if (!objPlan) {
            return res.status(400).json({
                error: 'Plano não existe!',
            });
        }

        const price = objPlan.duration * objPlan.price;
        const end_date = addMonths(parseISO(start_date), objPlan.duration);

        await objEnrollment.update({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        return res.json({ objEnrollment });
    }

    async listOne(req, res) {
        const { id } = req.params;
        const objEnrollment = await Enrollment.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'nome'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration', 'price', 'total'],
                },
            ],
        });

        if (!objEnrollment)
            return res.status(404).json({ error: 'Matrícula não localizada!' });

        return res.json(objEnrollment);
    }

    async listAll(req, res) {
        const term = req.query.term || '';
        const page = parseInt(req.query.page || 1, 10);
        const perPage = parseInt(req.query.perPage || 5, 10);
        const enrollments = await Enrollment.findAndCountAll({
            order: ['id'],
            where: {
                [Op.or]: [
                    {
                        '$student.nome$': {
                            [Op.like]: `%${term}%`,
                        },
                    },
                    {
                        '$plan.title$': {
                            [Op.like]: `%${term}%`,
                        },
                    },
                ],
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'nome'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration', 'price', 'total'],
                },
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        });

        // return res.json(enrollments);

        const totalPage = Math.ceil(enrollments.count / perPage);

        return res.json({
            page,
            perPage,
            data: enrollments.rows,
            total: enrollments.count,
            totalPage,
        });
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await Enrollment.destroy({ where: { id } });
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

export default new EnrollmentController();

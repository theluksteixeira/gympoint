import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class HelpOrderController {
    async store(req, res) {
        const schema = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Informe sua pergunta.' });
        }

        const { id } = req.params;
        const { question } = req.body;

        const objHelpOrder = await HelpOrder.create({
            student_id: id,
            question,
            answer: '',
            answer_at: null,
        });

        return res.json({ objHelpOrder });
    }

    async listAll(req, res) {
        const page = parseInt(req.query.page || 1, 10);
        const perPage = parseInt(req.query.perPage || 5, 10);

        const helporders = await HelpOrder.findAndCountAll({
            order: [['created_at', 'DESC']],
            limit: perPage,
            offset: (page - 1) * perPage,
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'nome'],
                },
            ],
        });

        const totalPage = Math.ceil(helporders.count / perPage);

        return res.json({
            page,
            perPage,
            data: helporders.rows,
            total: helporders.count,
            totalPage,
        });
    }

    async listOne(req, res) {
        const { id } = req.params;
        const objHelpOrder = await HelpOrder.findAll({
            where: { student_id: id },
        });
        if (objHelpOrder.length === 0) {
            return res.status(400).json({
                error: 'Não há pedidos de auxílio desse aluno.',
            });
        }
        return res.json(objHelpOrder);
    }

    async answer(req, res) {
        const { id } = req.params;
        const objHelpOrder = await HelpOrder.findByPk(id, {
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['nome', 'email'],
                },
            ],
        });
        if (!objHelpOrder) {
            res.status(400).json({
                erro: 'Não foi localizado esse pedido de auxílio.',
            });
        }
        const { answer } = req.body;

        await objHelpOrder.update({
            answer,
            answer_at: new Date(),
        });

        Mail.sendMail({
            to: `${objHelpOrder.student.nome} <${objHelpOrder.student.email}>`,
            subject: 'Pedido de auxílio respondido',
            text:
                'Pergunta: ' +
                `${objHelpOrder.question}\n Resposta: ${objHelpOrder.answer}`,
        });

        return res.json({ objHelpOrder });
    }
}

export default new HelpOrderController();

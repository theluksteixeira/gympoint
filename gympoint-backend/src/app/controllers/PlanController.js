import * as Yup from 'yup';
import { Op } from 'sequelize';
import Plan from '../models/Plan';

class PlanController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Algum campo falhou na validação.' });
        }

        const { id, title, duration, price } = await Plan.create(req.body);

        return res.json({
            id,
            title,
            duration,
            price,
        });

        // return res.json({ ok: 'okok' });
    }

    async listOne(req, res) {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);

        if (!plan)
            return res.status(404).json({ error: 'Plano não localizado' });

        return res.json(plan);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Algum campo falhou na validação.' });
        }

        const { id } = req.params;
        const objPlan = await Plan.findByPk(id);

        if (!objPlan) {
            return res.status(400).json({
                error: 'Plano não existe.',
            });
        }

        const { title, duration, price } = await objPlan.update(req.body);
        return res.json({
            id,
            title,
            duration,
            price,
        });
    }

    async delete(req, res) {
        const { id } = req.params;
        const objPlan = await Plan.findByPk(id);

        if (!objPlan) {
            return res.status(400).json({
                error: 'Plano não existe.',
            });
        }

        try {
            await objPlan.destroy();
            return res.status(200).json({
                Msg: 'Registro removido com sucesso.',
            });
        } catch (err) {
            return res.status(400).json({
                Msg: 'Erro ao remover o registro.',
            });
        }
    }

    async listAll(req, res) {
        const title = req.query.title || '';
        const page = parseInt(req.query.page || 1, 10);
        const perPage = parseInt(req.query.perPage || 5, 10);

        const plans = await Plan.findAndCountAll({
            order: ['title'],
            where: {
                title: { [Op.like]: `%${title}%` },
            },
            limit: perPage,
            offset: (page - 1) * perPage,
        });

        const totalPage = Math.ceil(plans.count / perPage);

        return res.json({
            page,
            perPage,
            data: plans.rows,
            total: plans.count,
            totalPage,
        });
    }
}

export default new PlanController();

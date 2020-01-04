import { subDays, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
    async store(req, res) {
        const { id } = req.params;
        const objStudent = await Student.findByPk(id);
        if (!objStudent) {
            return res.status(400).json({
                error: 'Não existe esse aluno em nossa base!',
            });
        }

        const objMatricula = await Enrollment.findOne({
            where: { student_id: id },
        });
        if (!objMatricula || !isAfter(objMatricula.end_date, new Date())) {
            return res.status(401).json({
                error: 'A matrícula do aluno não existe ou já venceu o plano!',
            });
        }

        const checkins = await Checkin.findAll({
            where: {
                student_id: id,
                created_at: {
                    [Op.between]: [subDays(new Date(), 7), new Date()],
                },
            },
        });
        if (checkins.length >= 5) {
            return res.status(400).json({
                error:
                    'Você só pode fazer 5 check-in por semana, volte para a casa :-)! Chega de treinar!',
            });
        }

        const objCheckin = await Checkin.create({
            student_id: req.params.id,
        });

        return res.json({ objCheckin });
    }

    async listOne(req, res) {
        const { id } = req.params;
        const objStudent = await Student.findByPk(id);
        if (!objStudent) {
            return res.status(400).json({
                error: 'Não existe esse aluno em nossa base!',
            });
        }

        const objCheckinStudent = await Checkin.findAll({
            where: { student_id: id },
            attributes: ['id', 'student_id', 'created_at'],
            as: 'Checkin',
        });

        return res.json(objCheckinStudent);
    }
}

export default new CheckinController();

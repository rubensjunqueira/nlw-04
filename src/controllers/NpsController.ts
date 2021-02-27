import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

export class NpsController {
    async execute(req: Request, res: Response) {
        const { survey_id } = req.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find({ survey_id });

        const totalAnswers = surveysUsers.filter(x => x.value != null);
        const detractor = totalAnswers.filter(x => x.value <= 6).length;
        const promoters = totalAnswers.filter(x => x.value >= 9).length;

        const calculate = (promoters - detractor) / totalAnswers.length * 100;

        return res.send({
            detractor,
            promoters,
            nps: Number(calculate.toFixed(2))
        });
    }
}
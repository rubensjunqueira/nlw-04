import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";

export class SurveyController {
    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const surveyRepository = getCustomRepository(SurveyRepository);
        const newSurvey = surveyRepository.create({ title, description });
        await surveyRepository.save(newSurvey);

        res.status(201).send(newSurvey);
    }

    async list(req: Request, res: Response) {
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveys = await surveyRepository.find();
        res.send(surveys);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const surveyRepository = getCustomRepository(SurveyRepository);
        const result = await surveyRepository.delete(id);
        res.status(200).send(result);
    }
}
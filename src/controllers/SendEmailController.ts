import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendEmailService from "../services/SendEmailService";
import { resolve } from 'path';
import { AppError } from "../errors/AppError";

export class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });
        if (!user) {
            throw new AppError(`User ${email} doesn't not exists`);
        }

        const survey = await surveyRepository.findOne({ id: survey_id });

        if (!survey) {
            throw new AppError(`Survey doesn't exists`);
        }
        const surveyUserAlreadExists = await surveyUserRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ['user', 'survey']
        });

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

        const vars = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if (surveyUserAlreadExists) {
            vars.id = surveyUserAlreadExists.id;
            await SendEmailService.execute(email, survey.title, vars, npsPath);
            return res.send(surveyUserAlreadExists);
        }
        const surveyUser = surveyUserRepository.create({ user_id: user.id, survey_id });
        await surveyUserRepository.save(surveyUser);
        vars.id = surveyUser.id;

        await SendEmailService.execute(email, survey.title, vars, npsPath);

        return res.status(201).send(surveyUser);
    }
}
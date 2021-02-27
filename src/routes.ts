import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendEmailController';
import { SurveyController } from './controllers/SurveyController';
import UserController from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendEmailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//users
router.post('/users', userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.findById);

//surveys
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.list);
router.delete('/surveys/:id', surveyController.delete);

//sendEmail
router.post('/sendEmail', sendEmailController.execute);

//answer
router.get('/answers/:value', answerController.execute);

//Nps
router.get('/nps/:survey_id', npsController.execute);

export default router;
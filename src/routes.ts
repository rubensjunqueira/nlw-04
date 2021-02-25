import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';
import UserController from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

//users
router.post('/users', userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.findById);

//surveys
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.list);
router.delete('/surveys/:id', surveyController.delete);

export default router;
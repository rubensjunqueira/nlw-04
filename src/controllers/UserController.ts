import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists)
            res.status(400).send({ error: `User ${email} already exists` });
        else {
            const newUser = userRepository.create({ name, email });
            await userRepository.save(newUser);
            res.status(201).send(newUser);
        }
    }

    async list(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find();
        res.send(users);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);
        res.send(user);
    }
}

export default UserController;
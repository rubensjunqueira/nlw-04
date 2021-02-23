import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const userRepository = getRepository(User);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists)
            res.status(400).send({ error: `User ${email} already exists` });
        else {
            const newUser = userRepository.create({ name, email });
            await userRepository.save(newUser);
            res.send(newUser);
        }
    }

    async list(req: Request, res: Response) {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        res.send(users);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository = getRepository(User);
        const user = await userRepository.findOne(id);
        res.send(user);
    }
}

export default UserController;
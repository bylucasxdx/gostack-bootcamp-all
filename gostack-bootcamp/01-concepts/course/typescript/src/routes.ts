import { Request, Response} from 'express';
import { createUser } from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
    const user = createUser({
        name: "Lucas",
        email: "lucasmedeiros...",
        password: "1231231",
        techs: [
            "React",
            "Typescript",
            { title: "React-Native", experience: 100 }
        ]
    });

    return res.json({ message: 'Hello World' });
}
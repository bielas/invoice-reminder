import {Request, Response} from "express";
import {v4 as uuidv4} from "uuid";
import {mockedUsers, User} from "../model/user";

class UserController {

    private users: User[] = []

    constructor() {
        mockedUsers().then(users => this.users = users);
    }

    getUsers = (req: Request, res: Response) => {
        const getUsers = this.users.map(user => {
            delete user.password;
            return user;
        });
        res.send(getUsers);
    }
    getUser = (req: Request, res: Response) => {
        const {id} = req.params;
        const user: User | undefined = this.users.find(user => user.id === id);
        delete user?.password;
        res.send(user);
    }
    deleteUser = (req: Request, res: Response) => {
        const {id} = req.params;
        const index = this.users.findIndex(user => user.id === id);
        const newUsers = this.users.splice(index, 1);
        res.send(newUsers);
    }
    createUser = (req: Request, res: Response) => {
        this.users.push({...req.body, id: uuidv4()})
        res.send(this.users);
    }
    updateUser = (req: Request, res: Response) => {
    }
    getUserByEmail = (email: string): User | undefined => {
        return this.users.find(user => user.email === email);
    }

}

export default new UserController();

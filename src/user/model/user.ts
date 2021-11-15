import {v4 as uuidv4} from "uuid";
import bcrypt from 'bcryptjs';

export class User {
    public id: string;
    public creationDate: Date;

    private constructor(
        public name: string,
        public surname: string,
        public email: string,
        public lastUpdateDate: Date,
        public password?: string
    ) {
        this.id = uuidv4();
        this.creationDate = new Date();
    }

    public static mock(
        name: string,
        surname: string,
        email: string,
        password: string,
        lastUpdateDate: Date): User {

        return new User(name, surname, email, lastUpdateDate, password);
    }
}

export const mockedUsers = async (): Promise<User[]> => {
    const password = await hashPassword('admin');

    return [
        User.mock('Michał', 'Doe', 'admin@mail.com', password, new Date()),
        User.mock('Mariusz', 'Doe', 'mariusz.doe@mail.com', password, new Date())
    ]
}

const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
}

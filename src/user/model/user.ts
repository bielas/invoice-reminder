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

export const mockedUsers = () => {
    const password = hashPassword('admin');

    return [
        User.mock('Michał', 'Bielawski', 'admin@mail.com', password, new Date()),
        User.mock('Mariusz', 'Bielawski', 'mariusz.bielawski@mail.com', password, new Date())
    ]
}

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
}

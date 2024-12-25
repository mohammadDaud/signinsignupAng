export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    jwttoken!: string;
    roles!: Array<string>;
}

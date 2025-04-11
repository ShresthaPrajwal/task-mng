export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserDTO = {
    username: string;
    email: string;
    password: string;
};

export type Response<T> = {
    data: T;
    message: string;
    status: number;
};
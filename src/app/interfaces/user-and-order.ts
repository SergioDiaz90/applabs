export interface IUserAndOrder {
    user: IUser;
    orders: IOrder[]
}

export interface IOrder {
    name: string,
    description: string,
    state: IStates,
    formula: string
    components: any
}

export interface IUser {
    user: string,
    password: string
}

export interface IStates {
    createdAt?: Date,
    updatedAt?: Date,
    status?: string
}
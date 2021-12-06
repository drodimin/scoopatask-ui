export interface IDataContext{
    userContext : IUserContext
}

type Dispatch<A> = (value: A) => void;

export interface IUserContext{
    user: IUser ,
    loginUser: Dispatch<IUser>,
    handleSignOut: () => Promise<void>;
}

export interface IUser{
    email?: string;
}
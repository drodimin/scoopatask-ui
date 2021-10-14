export interface IAppData {
    _buckets: IBucket[] | undefined;
}

export interface IBucket {
    _id: string;
    created: Date | undefined;
    updated: Date | undefined;
    _tasks: ITask[] | undefined;
    name: string;
}

export interface ITask {
    _id: string;
    name: string;
    isComplete: boolean | undefined;
}


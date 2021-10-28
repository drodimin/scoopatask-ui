export interface IAppData {
    _buckets?: IBucket[];
}

export interface IBucket {
    _id: string;
    created?: Date;
    updated?: Date;
    _tasks?: ITask[];
    name: string;
}

export interface ITask {
    _id: string;
    name: string;
    isComplete?: boolean;
}


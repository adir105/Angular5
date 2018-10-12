export interface ResponseModel{
    Error: string; 
    Data: any;
    State: State; 
}

export enum State{
    Success = 1,
    NotFound = 2,
    BadRequext = 3,
    Conflict = 4
}
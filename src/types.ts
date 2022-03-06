export interface IStorageAPI {

}
export interface IRoute {

}

export interface Route {
    path:String,

}

export interface IBot {
    new (token: String, storage: IStorageAPI);
    use(route:IRoute): undefined;
    on(path:String): undefined;

}

export interface IUser {

}

export interface IRequest {

}

export interface IResponse {

}
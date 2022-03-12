import { IUser } from "./types"

class User implements IUser {
    readonly id: string | number;
    history: Array<Object> = [];
    path:Array<string> = [];
    constructor(id: string | number, path: Array<string>, history: Array<Object>) {
        this.id = id;
        this.path = path || [];
        this.history = history || [];
    }
}

export default User;
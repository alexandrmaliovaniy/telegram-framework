import { IStorageAPI, IUser } from "./types";

class StorageAPI implements IStorageAPI {
    constructor() {}
    async Set(user: IUser) {}
    async Get(id: string | number) {
        return null;
    }
}

export default StorageAPI;
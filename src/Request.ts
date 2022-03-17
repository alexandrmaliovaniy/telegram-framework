import TelegramBot = require("node-telegram-bot-api");
import { IRequest, IUser } from "./types";

class Request implements IRequest {
    user: IUser;
    message: TelegramBot.Message;
    body: Object;
    constructor(props: {user: IUser, message: TelegramBot.Message, body: Object}) {
        this.user = props.user;
        this.message = props.message;
        this.body = props.body;
    }
    match(...cases:Array<string|Array<string>|Function>) {
        let trigger = false;
        for (const item of cases) {
            if (typeof item === 'string' && (item === this.message.text || item === 'default')) trigger = true;
            if (Array.isArray(item) && item.includes(this.message.text)) trigger = true;
            if (typeof item === 'function' && trigger) return item();
        }
        return null;
    }
}

export default Request;
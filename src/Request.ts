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
}

export default Request;
import TelegramBot = require("node-telegram-bot-api");
import {IBot, IKeyboard, IResponse, IStorageAPI, IUser} from "./types";
import {parseURL} from "./Utils";
import Keyboard from "./Keyboard";

class Response implements IResponse {
    private user: IUser;
    public bot: TelegramBot;
    private storage: IStorageAPI;
    private query: TelegramBot.Message;

    constructor(user: IUser, bot: TelegramBot, storage: IStorageAPI, query: TelegramBot.Message) {
        this.user = user;
        this.bot = bot;
        this.storage = storage;
        this.query = query;
    }

    reply(msg: string, keyboard?: IKeyboard) {
        this.bot.sendMessage(this.query.chat.id, msg, {
            ...keyboard.build(),
            reply_to_message_id: this.query.message_id
        })
    }

    message(msg: string, options: TelegramBot.SendMessageOptions | Keyboard) {
        if (options instanceof Keyboard) options = options.build();
        return this.bot.sendMessage(this.query.chat.id, msg, options);
    }

    redirect(path: string) {
        this.user.history.push(this.user.path);
        this.user.path = parseURL(path);
        this.storage.Set(this.user);
        this.bot.emit("message", {...this.query, text: null});
    }

    push(path: string) {
        this.user.history.push(this.user.path);
        this.user.path.push(...parseURL(path));
        this.storage.Set(this.user);
        this.bot.emit("message", {...this.query, text: null});
    }

    pushBack() {
        this.user.path = this.user.history.pop() as Array<string>;
        this.storage.Set(this.user);
        this.bot.emit("message", {...this.query, text: null});
    }
}

export default Response;

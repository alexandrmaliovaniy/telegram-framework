import * as TelegramBot from "node-telegram-bot-api";

class Keyboard {
    protected buttons: Array<any> = [];
    protected rows: number = null;
    protected cols: number = null;
    constructor(buttons: Array<Array<any>>) {
        this.buttons = buttons.reduce((prev, item) => {
            prev.push(...item)
            return prev;
        }, []);
        this.rows = buttons.length;
        this.cols = buttons[0].length;
    }
    has(button: string) {
        return false;
    }
    build(): TelegramBot.SendMessageOptions {
        return {};
    }
}

export default Keyboard;
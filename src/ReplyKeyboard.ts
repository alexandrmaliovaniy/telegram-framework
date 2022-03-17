import Keyboard from "./Keyboard";
import * as TelegramBot from "node-telegram-bot-api";
import {ReplyKeyboard as RKeyboard, Row, KeyboardButton} from "node-telegram-keyboard-wrapper";

class ReplyKeyboard extends Keyboard {
    has(button: string): boolean {
        return this.buttons.includes(button);
    }

    build(): TelegramBot.SendMessageOptions {
        const keyboardInstance = new RKeyboard();
        for (let y = 0; y < this.rows; y++) {
            const row = new Row<KeyboardButton>();
            for (let x = 0; x < this.cols; x++) {
                row.push(new KeyboardButton(this.buttons[x + y * this.cols].toString()))
            }
            keyboardInstance.push(row);
        }

        return {
            reply_markup: keyboardInstance.getMarkup()
        }
    }
}
export default ReplyKeyboard;
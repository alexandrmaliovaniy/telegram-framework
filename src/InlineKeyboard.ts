import Keyboard from "./Keyboard";
import * as TelegramBot from "node-telegram-bot-api";
import {InlineKeyboard as IKeyboard, Row, InlineKeyboardButton} from "node-telegram-keyboard-wrapper";

class InlineKeyboard extends Keyboard {
    has(button: string): boolean {
        return !!this.buttons.find(e => e.label === button);
    }

    build(): TelegramBot.SendMessageOptions {
        const keyboardInstance = new IKeyboard();
        for (let y = 0; y < this.rows; y++) {
            const row = new Row<InlineKeyboardButton>();
            for (let x = 0; x < this.cols; x++) {
                const button = this.buttons[x + y * this.cols];
                row.push(new InlineKeyboardButton(button.label, button.type, button.data))
            }
            keyboardInstance.push(row);
        }

        return {
            reply_markup: keyboardInstance.getMarkup()
        }
    }
}
export default InlineKeyboard;
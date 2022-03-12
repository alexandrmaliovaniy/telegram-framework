import TelegramBot = require("node-telegram-bot-api");
import messageListener from "./botListener/messageListener";
import Route from "./Router";
import {
  IBot,
  IBotOptions,
  IEventCallback,
  IRequest,
  IResponse,
  IRoute,
  IRouter,
  IStorageAPI,
} from "./types";

class Bot implements IBot {
  botInstance: TelegramBot;
  storageInstance: IStorageAPI;
  router: Route = new Route();

  constructor(token: string, storage: IStorageAPI, options: IBotOptions = {}) {
    this.botInstance = new TelegramBot(token, options);
    this.storageInstance = storage;
    this.botInstance.on('message', messageListener.bind(this))
  }

  use(path: string, router: IRouter): void {
    this.router.use(path, router);
  }
  useMiddleware(...middleware: Array<IEventCallback>): void {
    this.router.useMiddleware(...middleware);
  }

  on(path: string, callback: IEventCallback, ...middleware: Array<IEventCallback>) {
      this.router.on(path,callback, ...middleware);
  }
}

export default Bot;
    
import TelegramBot = require("node-telegram-bot-api");

export interface IStorageAPI {
  Set(user: IUser): void;
  Get(id: string | number): Promise<IUser> | Promise<null>;
}

export interface IRoute {
  path: Array<string>;
  middleware: Array<IEventCallback>;
}

export interface IRouter extends Array<IRoute> {
  routerMiddleware: Array<IEventCallback>;
  use(path: string, router: IRouter): void;
  on(path: string, callback: IEventCallback, ...middleware: Array<IEventCallback>): void;
  useMiddleware(...middleware: Array<IEventCallback>): void;
}

export interface IBot {
  botInstance: TelegramBot;
  storageInstance: IStorageAPI;
  router: IRouter;
  use(path: string, router: IRouter): void;
  on(path: string, callback: IEventCallback, ...middleware: Array<IEventCallback>): void;
  useMiddleware(...middleware: Array<IEventCallback>): void;
}

export interface IBotOptions extends TelegramBot.ConstructorOptions {}

export interface IUser {
  id: string | number;
  path: Array<string>;
  history: Array<Object>;
}

export interface IRequest {
  user: IUser,
  message: TelegramBot.Message,
  body: {
    [key: string]: any;
  }
}

export interface IResponse {
  bot: TelegramBot;
  reply(msg: string);
  message(msg: string, options?: Object);
  redirect(path: string);
  push(path: string);
  pushBack();

}

export interface IEventCallback {
  (req: IRequest, res: IResponse, next: () => void): void;
}

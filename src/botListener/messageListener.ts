import TelegramBot = require("node-telegram-bot-api");
import Request from "../Request";
import Response from "../Response";
import { IBot } from "../types";
import User from "../User";
import { comparePath, compareRouteAndPath } from "../Utils";

async function messageListener(this: IBot, query: TelegramBot.Message) {
  const userData = await this.storageInstance.Get(query.from.id);
  const user = new User(query.from.id, userData.path, userData.history);
	
  for (const route of this.router) {
    const [isSame, body] = compareRouteAndPath(route.path, user.path);
    if (!isSame) continue;

    const callbackQueue = [
      ...this.router.routerMiddleware,
      ...route.middleware,
    ];
    if (callbackQueue.length === 0) continue;

    const req = new Request({
			user,
			body,
			message: query,
		});
    const res = new Response(user, this.botInstance, this.storageInstance, query);
		const prevPath = [...user.path];
		async function next() {
			const _cb = callbackQueue.shift();
			if (!_cb) return;
			await _cb(req, res, next);
		}
    const cb = callbackQueue.shift();
		await cb(req, res, next);

		if (!comparePath(prevPath, [...user.path])) break;
  }
}

export default messageListener;

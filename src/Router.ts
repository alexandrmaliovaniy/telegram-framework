import { IEventCallback, IRoute, IRouter } from "./types";
import { parseURL } from "./Utils";
class Router extends Array<IRoute> implements IRouter {
  routerMiddleware: Array<IEventCallback> = [];
  constructor() {
    super();
  }
  on(path: string, callback: IEventCallback, ...middleware: Array<IEventCallback>): void {
    this.push({
      path: parseURL(path),
      middleware: [callback, ...middleware],
    });
  }
  use(path: string, router: IRouter): void {
    this.push(
      ...router.map((route) => ({
        path: [...parseURL(path), ...route.path],
        middleware: [...this.routerMiddleware, ...router.routerMiddleware, ...route.middleware],
      }))
    );
  }
  useMiddleware(...middleware: Array<IEventCallback>): void {
    this.routerMiddleware.push(...middleware);
  }
}

export default Router;

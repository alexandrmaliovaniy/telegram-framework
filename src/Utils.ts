export const compareRouteAndPath = (
  route: Array<string>,
  path: Array<string>
): [boolean, Object] => {
  const destination = route[route.length - 1];
  if (!destination) return [route.length === path.length, {}];
  if (destination.indexOf(":") !== 0 && destination !== "*")
    return [comparePath(route, path), {}];
  const sameRoute = comparePath(route.slice(0, -1), path.slice(0, -1));
  if (destination === "*")
    return [sameRoute, path.slice(route.length - 1, path.length).join("/")];
  return [
    sameRoute,
    {
      [destination.slice(1)]: path
        .slice(route.length - 1, path.length)
        .join("/"),
    },
  ];
};
export const comparePath = (pathA: Array<string>, pathB: Array<string>) => {
  if (pathA.length !== pathB.length) return false;
  for (let i = 0; i < pathA.length; i++) {
    if (pathA[i] !== pathB[i]) return false;
  }
  return true;
};

export const parseURL = (url: string): Array<string> => {
  return url.split("/").filter((e) => e !== "");
};

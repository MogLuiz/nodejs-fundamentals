import http from "http";
import { routes } from "./routes.js";
import { transformBuffersStreamsToJson } from "./middlewares/transformBuffersStreamsToJson.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await transformBuffersStreamsToJson(request, response);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = request.url.match(route.path);
    request.params = { ...routeParams.groups };
    return route.handler(request, response);
  }

  return response.writeHead(404).end("");
});

server.listen(3333);

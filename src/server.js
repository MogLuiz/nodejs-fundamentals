import http from "http";
import { Database } from "./database.js";
import { transformBuffersStreamsToJson } from "./middlewares/transformBuffersStreamsToJson.js";
import { routes } from "./routes.js";

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await transformBuffersStreamsToJson(request, response);

  const route = routes.find(
    (route) => route.method === method && route.path === url
  );

  if (route) return route.handler(request, response);

  return response.writeHead(404).end("");
});

server.listen(3333);

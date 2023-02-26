import http from "http";
import { Database } from "./database.js";
import { transformBuffersStreamsToJson } from "./middlewares/transformBuffersStreamsToJson.js";

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await transformBuffersStreamsToJson(request, response);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);

    return response.writeHead(201).end("Usuário criado com sucesso!");
  }

  return response.writeHead(404).end("");
});

server.listen(3333);

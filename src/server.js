import http from "http";

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/users") {
    return response.end(users)
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: "1",
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return response.end('Usuário criado com sucesso!')
  }

  return response.end("Hello World");
});

server.listen(3333);

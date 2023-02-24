import http from "http";

const server = http.createServer((request, response) => {
  return response.end("Hello World");
});


server.listen(3333)
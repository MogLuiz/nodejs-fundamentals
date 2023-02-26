import { OneToHundredStream } from "./fundamentals";

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
});

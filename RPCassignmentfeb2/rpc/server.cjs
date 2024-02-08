// process P (server)

const express = require('express')
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");

const server = new JSONRPCServer();

const app = express();
app.use(bodyParser.json());


server.addMethod("increment", ({ i }) => console.log(i++));
server.addMethod("add", ({ f,i }) => console.log(i+(f^2)));
server.addMethod("stringRev", ({ string }) => console.log(string[0].split('').reverse().join('')));


app.post("/json-rpc", (req, res) => {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        res.sendStatus(204);
      }
    });
  });
  
  app.listen(80);
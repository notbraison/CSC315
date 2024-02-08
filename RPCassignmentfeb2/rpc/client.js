// client.js
import { JSONRPCClient } from "json-rpc-2.0";


const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("http://localhost/json-rpc", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);

client
  .request("increment",1)
  .then((result) => console.log(result));

client
  .request("add", 1,2)
  .then((result) => console.log(result));

client
  .request("stringRev", "Rambanctious" )
  .then((result) => console.log(result));
  


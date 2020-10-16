const http = require("http");
const net = require("net");
const tls = require("tls");
const fs = require("fs");
const { Writable } = require("stream");
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const outStream = new Writable({
  write(chunk, encodeing, callback) {
    //console.log("check, write");
    //console.log(chunk.toString());
    callback();
  },
});

const server = net
  .createServer((socket) => {
    console.log("something connected");
    //socket.end("goodbye\n");
    //socket.pipe(outStream);
    //const targetSocket = net.connect({ port: 80 });
    const targetSocket = tls.connect({
      host: "192.168.15.120",
      port: 443,
      //   requestCert: true,
      //   rejectUnauthorized: true,
      //   key: fs.readFileSync("server.key", "utf8"),
      //   cert: fs.readFileSync("server.cert", "utf8"),
      rejectUnauthorized: false,
      requestCert: true,
      //   agent: false,
      //   ca: fs.readFileSync("my-private-root-ca.cert.pem"),
    });
    //socket.pipe(interceptTransform).pipe(res);

    socket.pipe(targetSocket);
    targetSocket.pipe(socket);
  })
  .on("error", (err) => {
    // Handle errors here.
    throw err;
  });

// Grab an arbitrary unused port.
server.listen(6000, () => {
  console.log("opened server on", server.address());
});

process.on("uncaughtException", function (err) {
  console.error(err.stack);
  console.log("Not exiting");
});
// http
//   .createServer((request, response) => {
//     let body = [];

//     const outStream = new Writable({
//       write(chunk, encodeing, callback) {
//         console.log("check, write");
//         console.log(chunk.toString());
//         callback();
//       },
//     });

//     console.log(request);
//     request.pipe(outStream);
//     // request
//     //   .on("data", (chunk) => {
//     //     console.log(chunk.toString());
//     //     body.push(chunk);
//     //   })
//     //   .on("end", () => {
//     //     body = Buffer.concat(body).toString();
//     //     response.end(body);
//     //   });
//   })
//   .listen(6000);

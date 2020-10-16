const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 6000;
const { Writable, Transform } = require("stream");
const axios = require("axios");
const net = require("net");

//app.get("/:filename", async (req, res) => {
app.get("/:filename", (req, res) => {
  console.log("============ check, GET");
  // const { filename } = req.params;
  // console.log({ filename });
  // const { headers } = req;
  // console.log("headers ", headers);
  // let headerData = "";
  // for (const entry in headers) {
  //   headerData += `${entry}:${headers[entry]}\r\n`;
  // }
  // console.log(headerData);

  const interceptTransform = new Transform({
    transform(chunk, encoding, callback) {
      console.log("check, transform");
      this.push(chunk);
      console.log(chunk.toString());
      callback();
    },
  });

  const outStream = new Writable({
    write(chunk, encodeing, callback) {
      console.log("check, write");
      console.log(chunk.toString());
      callback();
    },
  });

  //const socket = net.connect({ port: 80 });
  //socket.pipe(res);
  //req.pipe(socket);
  //req.pipe(outStream);
  req.on("data", (data) => console.log(data.toString()));
  //req.pipe(interceptTransform).pipe(socket);
  //socket.on("data", (data) => console.log("data:", data.toString()));
});

app.post("/:filename", (req, res) => {
  const interceptTransform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk);
      console.log(chunk.toString());
      callback();
    },
  });
  const socket = net.connect({ port: 80 });
  //socket.pipe(interceptTransform).pipe(res);
  socket.pipe(res);
  //req.pipe(socket);
  req.pipe(interceptTransform).pipe(socket);
  socket.on("data", (data) => console.log("data:", data.toString()));

  console.log("========== check, POST");
  // console.log("filename: ", req.params.filename);
  // console.log("headers: ", req.headers);
  // console.log("body: ", req.body);

  // const outStream = new Writable({
  //   write(chunk, encoding, callback) {
  //     console.log(chunk.toString());
  //     callback();
  //   },
  // });
  // req.pipe(outStream);

  // res.send("temporary");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});

// const headers = {
//   cseq: "1",
//   "user-agent":
//     "F:\\pilot\\rtspClient\\cmake-build-debug\\rtspClient.exe (LIVE555 Streaming Media v2020.03.06)",
//   host: "127.0.0.1",
//   "x-sessioncookie": "118787f990dc320ada6b325",
//   accept: "application/x-rtsp-tunnelled",
//   pragma: "no-cache",
//   "cache-control": "no-cache",
// };

// const requestTest = async () => {
//   const socket = net.connect({ port: 80 });
//   socket.on("connect", () => {
//     console.log("connected");
//     const sendData = "GET /sunrise.mkv HTTP/1.1\r\n";
//     let headers = "CSeq: 1\r\n";
//     headers +=
//       "User-Agent: F:\\pilot\\rtspClient\\cmake-build-debug\\rtspClient.exe (LIVE555 Streaming Media v2020.03.06)\r\n";
//     headers += "Host: 127.0.0.1\r\n";
//     headers += "x-sessioncookie: 118787f990dc320ada6b325\r\n";
//     headers += "Accept: application/x-rtsp-tunnelled\r\n";
//     headers += "Pragma: no-cache\r\n";
//     headers += "Cache-Control: no-cache\r\n";
//     socket.write(sendData + headers + "\r\n");
//     socket.end();
//   });
//   socket.on("data", (data) => {
//     console.log("recv: ", data.toString());
//   });
//   socket.on("end", () => {
//     console.log("disconnected");
//   });
// };

// requestTest();

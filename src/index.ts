import express from "express";
import http from "http";
import cors from "cors";

const port = 3002;
const app = express();
app.use(
  express.json({
    type(_) {
      return true;
    },
  })
);
app.use(cors());
const server = http.createServer(app);

//204 no update
app.get("/", (req, res) => {
  console.log("req", req);
  res.status(200).send(
    JSON.stringify({
      url: "http://localhost:3002/static/com.github.Electron-darwin-arm64-1.0.0.zip",
      name: "My Release Name",
      notes: "Theses are some release notes innit",
      pub_date: "2013-09-18T12:29:53+01:00",
    })
  );
});

//

app.use("/static", express.static("public"));

server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
import express from "express";
import http from "http";
import cors from "cors";

type QueryParams = {
  arch: string;
  platform: string;
  current_version: string;
};

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

const currentVersion = "1.0.6";

const hasUpdate = (queryParams: QueryParams) => {
  return queryParams.current_version !== currentVersion;
};

app.get("/check-update", (req, res) => {
  const query = req.query as QueryParams;
  console.log("handling:" + JSON.stringify(query));

  if (hasUpdate(query)) {
    console.log("has update");
    res.status(200).send(
      JSON.stringify({
        url: `http://localhost:3002/static/Dirent-darwin-arm64-${currentVersion}.zip`,
        name: currentVersion,
        notes: "Theses are some release notes innit",
        pub_date: "2022-09-18T12:29:53+01:00",
      })
    );
  } else {
    console.log("no update");
    res.status(204).send();
  }
});

app.use("/static", express.static("public"));

server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

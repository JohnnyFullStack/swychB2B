const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3010;

const serverEnvironment = process.env.serverEnv || "dev";

app.use(express.static(path.join(__dirname, "build")));


// app.get("/config", (req, res) => {
//   const configMap = {
//     dev: require("./config/dev.json"),
//     sit: require("./config/sit.json"),
//     uat: require("./config/uat.json"),
//     prod: require("./config/prod.json")
//   };
//   const configurations = configMap[process.env.serverEnv]
//     ? configMap[process.env.serverEnv]
//     : configMap["dev"];

//   res.send(configurations);
// });


// All API of this server should be written before this line as the middleware execute sequentially
app.get("/b2bportal/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(
    `\nSwych Alipay Yoyogo Purchase Portal is being served in ${serverEnvironment} environment at port ${PORT}`
  );
  console.log(
    "\x1b[33m%s\x1b[0m",
    "\nThe environment logged above is the environment of node server which is " +
      "\ndifferent from your react app's environment. That should be passed during the build of react application as REACT_APP_ENV\n"
  );
});

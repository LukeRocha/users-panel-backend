const express = require("express"); //express instance used on projects

const cors = require("cors"); //where did the request will come from
const bodyParser = require("body-parser"); //How we'll deal with the information that will be sent to us
const package = require("./package.json"); //requirement of the json file, such as dependencies and versions

const port = process.env.port || process.env.PORT || 5000; //thats the port of app, 5000
const apiRoot = "/api";
const app = express();
//configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

const router = express.Router();
router.get("/", (req, res) => {
  res.send(`${package.description} - V${package.version}`);
});

//register all our routes
app.use(apiRoot, router);
app.listen(port, () => {
  console.log("Users Panel API :D");
});

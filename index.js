const Koa = require("koa");
const router = require("./middleware/router");
const logger = require("koa-logger");
const koaBody = require("koa-bodyparser");
const validator = require("./middleware/validator");
const app = new Koa();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/koa-contact", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  throw new Error(`error connection to db: ${error}`);
});

db.once("open", () => console.log("database connected"));

// * Looger
app.use(logger());

app.use(koaBody());

app.use(validator());

// * Router
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

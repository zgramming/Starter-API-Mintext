import Koa from "koa";
import Logger from "koa-logger";
import Json from "koa-json";
import BodyParser from "koa-bodyparser";
import KoaBody from "koa-body";
import router from "./routes/routes";

const cors = require("@koa/cors");
const app = new Koa();

app.use(
  KoaBody({
    multipart: true,
  })
);
app.use(cors());
app.use(Json());
app.use(Logger());
app.use(BodyParser());
app.use(router());

app.listen(3000, () => {
  console.log("Koa server is started");
});

import UserRouter from "./setting/user";
import UserGroupRouter from "./setting/user_group";
import combineRouters from "koa-combine-routers";
import ModulRouter from "./setting/modul";
import MenuRouter from "./setting/menu";

const router = combineRouters([
  UserRouter,
  UserGroupRouter,
  ModulRouter,
  MenuRouter,
]);

export default router;

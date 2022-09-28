import UserRouter from "./setting/user";
import UserGroupRouter from "./setting/user_group";
import combineRouters from "koa-combine-routers";
import ModulRouter from "./setting/modul";
import MenuRouter from "./setting/menu";
import AccessModulRouter from "./setting/access_modul";
import AccessMenuRouter from "./setting/access_menu";

const router = combineRouters([
  UserRouter,
  UserGroupRouter,
  ModulRouter,
  MenuRouter,
  AccessModulRouter,
  AccessMenuRouter,
]);

export default router;

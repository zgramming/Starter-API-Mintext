import combineRouters from "koa-combine-routers";

import AccessMenuRouter from "./setting/access_menu";
import AccessModulRouter from "./setting/access_modul";
import DocumentationRouter from "./setting/documentation";
import MasterCategoryRouter from "./setting/master_category";
import MasterDataRouter from "./setting/master_data";
import MenuRouter from "./setting/menu";
import ModulRouter from "./setting/modul";
import ParameterRouter from "./setting/parameter";
import UserRouter from "./setting/user";
import UserGroupRouter from "./setting/user_group";

const router = combineRouters([
  UserRouter,
  UserGroupRouter,
  ModulRouter,
  MenuRouter,
  AccessModulRouter,
  AccessMenuRouter,
  MasterCategoryRouter,
  MasterDataRouter,
  ParameterRouter,
  DocumentationRouter,
]);

export default router;

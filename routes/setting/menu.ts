import Router from "koa-router";
import validator from "validator";

import { PrismaClient, StatusActive } from "@prisma/client";

const prisma = new PrismaClient();
const MenuRouter = new Router({ prefix: "/setting/menu" });

MenuRouter.get("/", async (ctx, next) => {
  const {
    app_modul_id = 0,
    name = "",
    route = "",
  }: { app_modul_id?: number; name?: string; route?: string } = ctx.query;

  const result = await prisma.appMenu.findMany({
    where: {
      ...(app_modul_id && { app_modul_id: +app_modul_id }),
      ...(name && { name: name }),
      ...(route && { route: route }),
    },
  });
  return (ctx.body = { success: true, data: result });
});

MenuRouter.post("/", async (ctx, next) => {
  try {
    const {
      app_modul_id = 0,
      app_menu_id_parent,
      code = "",
      name = "",
      route = "",
      order = 0,
      icon,
      status = "active",
    }: {
      app_modul_id?: number;
      app_menu_id_parent?: number;
      code?: string;
      name?: string;
      route?: string;
      order?: number;
      icon?: string;
      status?: StatusActive;
    } = JSON.parse(JSON.stringify(ctx.request.body));

    if (app_modul_id == 0) ctx.throw("Modul required", 400);
    if (validator.isEmpty(code)) ctx.throw("Code required", 400);
    if (validator.isEmpty(name)) ctx.throw("Name required", 400);
    if (validator.isEmpty(route)) ctx.throw("Route required", 400);

    const result = await prisma.appMenu.create({
      data: {
        app_modul_id: +app_modul_id,
        app_menu_id_parent: app_menu_id_parent && +app_menu_id_parent,
        code: code,
        name: name,
        route: route,
        icon: icon,
        order: +order,
        status: status,
      },
    });

    return (ctx.body = {
      success: true,
      data: result,
      message: "Berhasil membuat menu dengan nama " + name,
    });
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

MenuRouter.put("/:id", async (ctx, next) => {
  try {
    const { id = 0 }: { id?: number } = ctx.params;
    const {
      app_modul_id = 0,
      app_menu_id_parent,
      code = "",
      name = "",
      route = "",
      order = 0,
      icon,
      status = "active",
    }: {
      app_modul_id?: number;
      app_menu_id_parent?: number;
      code?: string;
      name?: string;
      route?: string;
      order?: number;
      icon?: string;
      status?: StatusActive;
    } = JSON.parse(JSON.stringify(ctx.request.body));

    if (id == 0) ctx.throw("ID required", 400);
    if (app_modul_id == 0) ctx.throw("Modul required", 400);
    if (validator.isEmpty(code)) ctx.throw("Code required", 400);
    if (validator.isEmpty(name)) ctx.throw("Name required", 400);
    if (validator.isEmpty(route)) ctx.throw("Route required", 400);

    const result = await prisma.appMenu.update({
      where: { id: +id },
      data: {
        app_modul_id: +app_modul_id,
        app_menu_id_parent: app_menu_id_parent && +app_menu_id_parent,
        code: code,
        name: name,
        route: route,
        icon: icon,
        order: +order,
        status: status,
      },
    });

    return (ctx.body = {
      success: true,
      data: result,
      message: "Berhasil mengupdate menu dengan nama " + name,
    });
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

MenuRouter.del("/:id", async (ctx, next) => {
  try {
    const { id = 0 }: { id?: number } = ctx.params;
    if (id == 0) ctx.throw("ID is required", 400);
    const result = await prisma.appMenu.delete({
      where: { id: +id },
    });

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Berhasil menghapus Menu",
      data: result,
    };
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

export default MenuRouter;

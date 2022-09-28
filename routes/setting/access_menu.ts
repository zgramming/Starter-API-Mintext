import Router from "koa-router";
import validator from "validator";

import { PrismaClient, StatusActive } from "@prisma/client";

const prisma = new PrismaClient();
const AccessMenuRouter = new Router({ prefix: "/setting/access_menu" });

AccessMenuRouter.get("/", async (ctx, next) => {
  const {
    app_group_user_id = 0,
    app_modul_id = 0,
  }: { app_group_user_id?: number; app_modul_id?: number } = ctx.query;

  const result = await prisma.appAccessMenu.findMany({
    where: {
      ...(app_group_user_id && { app_group_user_id: app_group_user_id }),
      ...(app_modul_id && { app_modul_id: app_modul_id }),
    },
  });
  return (ctx.body = { success: true, data: result });
});

AccessMenuRouter.post("/", async (ctx, next) => {
  try {
    const {
        app_group_user_id = 0,
        data = [],
      }: {
        app_group_user_id?: number;
        data: Array<{
          app_modul_id?: number;
          app_menu_id?: number;
          allowed_access?: string[];
        }>;
      } = JSON.parse(JSON.stringify(ctx.request.body));
    if (app_group_user_id == 0) ctx.throw("Group User required", 400);

    const removeAll = await prisma.appAccessMenu.deleteMany({
      where: {
        app_group_user_id: +app_group_user_id,
      },
    });

    const result = await prisma.appAccessMenu.createMany({
      data: data.map((val) => {
        return {
          app_group_user_id: +app_group_user_id,
          app_menu_id: +(val.app_menu_id ?? 0),
          app_modul_id: +(val.app_modul_id ?? 0),
          allowed_access: val.allowed_access,
        };
      }),
    });

    return (ctx.body = {
      success: true,
      data: result,
      message: "Berhasil membuat access menu",
    });
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

export default AccessMenuRouter;

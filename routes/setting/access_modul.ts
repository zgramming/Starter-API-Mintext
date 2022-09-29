import Router from "koa-router";
import validator from "validator";

import { PrismaClient, StatusActive } from "@prisma/client";

const prisma = new PrismaClient();
const AccessModulRouter = new Router({ prefix: "/api/setting/access_modul" });

AccessModulRouter.get("/", async (ctx, next) => {
  const {
    app_group_user_id = 0,
  }: { app_group_user_id?: number; app_modul_id?: number } = ctx.query;

  const result = await prisma.appAccessModul.findMany({
    where: {
      ...(app_group_user_id && { app_group_user_id: app_group_user_id }),
    },
  });
  return (ctx.body = { success: true, data: result });
});

AccessModulRouter.post("/", async (ctx, next) => {
  try {
    const {
      app_group_user_id = 0,
      data = [],
    }: {
      app_group_user_id?: number;
      data: Array<{
        app_modul_id?: number;
      }>;
    } = JSON.parse(JSON.stringify(ctx.request.body));

    const removeAll = await prisma.appAccessModul.deleteMany({
      where: {
        app_group_user_id: +app_group_user_id,
      },
    });

    const result = await prisma.appAccessModul.createMany({
      data: data.map((val) => {
        return {
          app_group_user_id: +app_group_user_id,
          app_modul_id: +(val.app_modul_id ?? 0),
        };
      }),
    });

    return (ctx.body = {
      success: true,
      data: result,
      message: "Berhasil membuat access modul",
    });
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

export default AccessModulRouter;

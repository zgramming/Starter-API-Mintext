import Router from "koa-router";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const AccessModulRouter = new Router({ prefix: "/api/setting/access_modul" });

AccessModulRouter.get("/", async (ctx, next) => {
  const {
    app_group_user_id = 0,
  }: { app_group_user_id?: number; app_modul_id?: number } = ctx.query;

  const result = await prisma.appAccessModul.findMany({
    include: {
      app_group_user: true,
      app_modul: true,
    },
    where: {
      ...(app_group_user_id && { app_group_user_id: +app_group_user_id }),
    },
  });
  return (ctx.body = { success: true, data: result });
});

AccessModulRouter.get(
  "/by_user_group/:app_group_user_id",
  async (context, next) => {
    const { app_group_user_id } = context.params;
    const result = await prisma.appAccessModul.findMany({
      where: {
        app_group_user_id: +(app_group_user_id ?? "0"),
      },
      include: {
        app_group_user: true,
        app_modul: {
          include: { menus: true, access_menu: true, access_modul: true },
        },
      },
      orderBy: {
        app_modul: {
          order: "asc",
        },
      },
    });
    context.body = {
      data: result,
    };
  }
);

AccessModulRouter.post("/", async (ctx, next) => {
  try {
    const {
      app_group_user_id = 0,
      access_modul = [],
    }: {
      app_group_user_id?: number;
      access_modul: Array<{
        app_modul_id?: number;
      }>;
    } = JSON.parse(JSON.stringify(ctx.request.body));

    const removeAll = await prisma.appAccessModul.deleteMany({
      where: {
        app_group_user_id: +app_group_user_id,
      },
    });

    const result = await prisma.appAccessModul.createMany({
      data: access_modul.map((val) => {
        return {
          app_group_user_id: +app_group_user_id,
          app_modul_id: +val,
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

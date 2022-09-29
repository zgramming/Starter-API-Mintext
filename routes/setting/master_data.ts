import Router from "koa-router";
import validator from "validator";
import { PrismaClient, StatusActive } from "@prisma/client";

const prisma = new PrismaClient();
const MasterDataRouter = new Router({
  prefix: "/api/setting/master_category",
});

MasterDataRouter.get("/", async (ctx, next) => {
  const {
    master_category_id,
    code,
    name,
    status = "active",
    limit = 10,
    offset = 0,
  }: {
    master_category_id?: number;
    code?: string;
    name?: string;
    status?: StatusActive;
    limit?: number;
    offset?: number;
  } = ctx.query;

  const result = await prisma.masterData.findMany({
    where: {
      ...(master_category_id && { master_category_id: +master_category_id }),
      ...(code && { code: code }),
      ...(name && { name: name }),
      ...(status && { status: status }),
    },
    ...(limit !== 0 && { take: +limit }),
    ...(offset !== 0 && { skip: +offset }),
  });

  return (ctx.body = { success: true, data: result });
});

MasterDataRouter.post("/", async (ctx, next) => {
  try {
    const {
      master_data_id,
      master_category_id = 0,
      master_category_code = "",
      code = "",
      name = "",
      description = "",
      status = "active",
      parameter1_key,
      parameter1_value,
      parameter2_key,
      parameter2_value,
      parameter3_key,
      parameter3_value,
    }: {
      master_data_id?: number;
      master_category_id?: number;
      master_category_code?: string;
      code?: string;
      name?: string;
      description?: string;
      status?: StatusActive;
      parameter1_key?: string;
      parameter1_value?: string;
      parameter2_key?: string;
      parameter2_value?: string;
      parameter3_key?: string;
      parameter3_value?: string;
    } = JSON.parse(JSON.stringify(ctx.request.body));

    if (master_category_id == 0 || validator.isEmpty(master_category_code)) {
      ctx.throw("Master Data Required", 400);
    }
    if (validator.isEmpty(code)) ctx.throw("Code required", 400);
    if (validator.isEmpty(name)) ctx.throw("Name required", 400);

    const result = await prisma.masterData.create({
      data: {
        master_data_id: master_data_id && +master_data_id,
        master_category_id: +master_category_id,
        master_category_code,
        code,
        name,
        description,
        status: status,
        parameter1_key,
        parameter1_value,
        parameter2_key,
        parameter2_value,
        parameter3_key,
        parameter3_value,
      },
    });

    return (ctx.body = {
      success: true,
      data: result,
      message: "Berhasil membuat Master Data dengan nama " + name,
    });
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

MasterDataRouter.put("/:id", async (ctx, next) => {
  try {
    const { id = 0 }: { id?: number } = ctx.params;
    const {
      master_data_id,
      master_category_id = 0,
      master_category_code = "",
      code = "",
      name = "",
      description = "",
      status = "active",
      parameter1_key,
      parameter1_value,
      parameter2_key,
      parameter2_value,
      parameter3_key,
      parameter3_value,
    }: {
      master_data_id?: number;
      master_category_id?: number;
      master_category_code?: string;
      code?: string;
      name?: string;
      description?: string;
      status?: StatusActive;
      parameter1_key?: string;
      parameter1_value?: string;
      parameter2_key?: string;
      parameter2_value?: string;
      parameter3_key?: string;
      parameter3_value?: string;
    } = JSON.parse(JSON.stringify(ctx.request.body));

    if (master_category_id == 0 || validator.isEmpty(master_category_code)) {
      ctx.throw("Master Data Required", 400);
    }
    if (validator.isEmpty(code)) ctx.throw("Code required", 400);
    if (validator.isEmpty(name)) ctx.throw("Name required", 400);

    const result = await prisma.masterData.update({
      where: {
        id: +id,
      },
      data: {
        master_data_id: master_data_id && +master_data_id,
        master_category_id: +master_category_id,
        master_category_code,
        code,
        name,
        description,
        status: status,
        parameter1_key,
        parameter1_value,
        parameter2_key,
        parameter2_value,
        parameter3_key,
        parameter3_value,
      },
    });

    return (ctx.body = {
      success: true,
      data: result,
      message: "Berhasil membuat Master Data dengan nama " + name,
    });
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

MasterDataRouter.del("/:id", async (ctx, next) => {
  try {
    const { id = 0 }: { id?: number } = ctx.params;
    if (id == 0) ctx.throw("ID is required", 400);
    const result = await prisma.masterData.delete({
      where: { id: +id },
    });

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Berhasil menghapus Master Data",
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
export default MasterDataRouter;

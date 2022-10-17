import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AccessModulSeeder = async () => {
  await prisma.appAccessModul.deleteMany();
  const superadmin = await prisma.appGroupUser.findFirst({
    where: { code: "superadmin" },
  });
  const modul = await prisma.appModul.findMany();
  const data = modul.map((val, index) => {
    return {
      app_group_user_id: superadmin?.id ?? 0,
      app_modul_id: val.id,
    };
  });

  await prisma.appAccessModul.createMany({ data: data });
};

export default AccessModulSeeder;

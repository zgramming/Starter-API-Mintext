import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
const saltRounds = 10;

const prisma = new PrismaClient();

const UsersSeeder = async () => {
  await prisma.users.deleteMany();
  const superadmin = await prisma.appGroupUser.findFirst({
    where: {
      code: "superadmin",
    },
  });

  const data = [
    {
      app_group_user_id: superadmin?.id ?? 0,
      name: "Zeffry Reynando",
      email: "zeffry.reynando@gmail.com",
      username: "zeffry",
      password: hashSync("zeffry", saltRounds),
      status: "active",
    },
  ];
  await prisma.users.createMany({ data: data });
};

export default UsersSeeder;

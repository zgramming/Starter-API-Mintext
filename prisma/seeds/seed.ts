import UserGroupSeeder from "./user_group_seeder";
import ModulSeeder from "./modul_seeder";
import UsersSeeder from "./users_seeder";
import MenuSeeder from "./menu_seeder";
import AccessModulSeeder from "./access_modul_seeder";
import AccessMenuSeeder from "./access_menu_seeder";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  try {
    /// Disabled foreign key check
    await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=0`;

    await UserGroupSeeder();
    await UsersSeeder();
    await ModulSeeder();
    await MenuSeeder();
    await AccessModulSeeder();
    await AccessMenuSeeder();

    /// Enabled Foreign key check
    await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=1`;
  } catch (error) {
    console.log({
      errorSeeder: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};

main();

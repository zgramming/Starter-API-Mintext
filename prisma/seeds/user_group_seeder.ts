import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserGroupData {
  name: string;
  code: string;
  status: string;
}

const UserGroupSeeder = async () => {
  await prisma.appGroupUser.deleteMany();
  const data: UserGroupData[] = [
    { name: "Superadmin", code: "superadmin", status: "active" },
    { name: "User", code: "user", status: "active" },
  ];
  await prisma.appGroupUser.createMany({ data: data });
};

export default UserGroupSeeder;

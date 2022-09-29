/*
  Warnings:

  - You are about to alter the column `status` on the `app_group_user` table. The data in that column could be lost. The data in that column will be cast from `Enum("app_group_user_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `app_menu` table. The data in that column could be lost. The data in that column will be cast from `Enum("app_menu_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `app_modul` table. The data in that column could be lost. The data in that column will be cast from `Enum("app_modul_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `documentation` table. The data in that column could be lost. The data in that column will be cast from `Enum("documentation_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `master_category` table. The data in that column could be lost. The data in that column will be cast from `Enum("master_category_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `master_data` table. The data in that column could be lost. The data in that column will be cast from `Enum("master_data_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `parameter` table. The data in that column could be lost. The data in that column will be cast from `Enum("parameter_status")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum("users_status")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `app_group_user` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `app_menu` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `app_modul` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `documentation` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `master_category` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `master_data` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `parameter` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `users` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';

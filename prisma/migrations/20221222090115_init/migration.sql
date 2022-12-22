/*
  Warnings:

  - You are about to alter the column `status` on the `app_group_user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("app_group_user_status")`.
  - You are about to alter the column `status` on the `app_menu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("app_menu_status")`.
  - You are about to alter the column `status` on the `app_modul` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("app_modul_status")`.
  - You are about to alter the column `status` on the `documentation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("documentation_status")`.
  - You are about to alter the column `status` on the `master_category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("master_category_status")`.
  - You are about to alter the column `status` on the `master_data` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("master_data_status")`.
  - You are about to alter the column `status` on the `parameter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("parameter_status")`.
  - You are about to alter the column `status` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("users_status")`.
  - You are about to drop the `cv_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cv_experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cv_portfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cv_portfolio_url` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cv_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cv_skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cv_education` DROP FOREIGN KEY `cv_education_users_id_fkey`;

-- DropForeignKey
ALTER TABLE `cv_experience` DROP FOREIGN KEY `cv_experience_users_id_fkey`;

-- DropForeignKey
ALTER TABLE `cv_portfolio` DROP FOREIGN KEY `cv_portfolio_users_id_fkey`;

-- DropForeignKey
ALTER TABLE `cv_portfolio_url` DROP FOREIGN KEY `cv_portfolio_url_cvportfolio_id_fkey`;

-- DropForeignKey
ALTER TABLE `cv_profile` DROP FOREIGN KEY `cv_profile_users_id_fkey`;

-- DropForeignKey
ALTER TABLE `cv_skill` DROP FOREIGN KEY `cv_skill_level_id_fkey`;

-- DropForeignKey
ALTER TABLE `cv_skill` DROP FOREIGN KEY `cv_skill_users_id_fkey`;

-- AlterTable
ALTER TABLE `app_group_user` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `app_menu` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `app_modul` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `documentation` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `master_category` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `master_data` ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `parameter` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(100) NULL,
    MODIFY `status` ENUM('active', 'inactive', 'blocked', 'process_verification') NOT NULL DEFAULT 'inactive';

-- DropTable
DROP TABLE `cv_education`;

-- DropTable
DROP TABLE `cv_experience`;

-- DropTable
DROP TABLE `cv_portfolio`;

-- DropTable
DROP TABLE `cv_portfolio_url`;

-- DropTable
DROP TABLE `cv_profile`;

-- DropTable
DROP TABLE `cv_skill`;

/*
  Warnings:

  - You are about to drop the column `app_menu_id_json` on the `app_access_menu` table. All the data in the column will be lost.
  - Made the column `app_menu_id` on table `app_access_menu` required. This step will fail if there are existing NULL values in that column.
  - Made the column `app_modul_id` on table `app_access_modul` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `app_access_menu` DROP FOREIGN KEY `app_access_menu_app_menu_id_fkey`;

-- DropForeignKey
ALTER TABLE `app_access_modul` DROP FOREIGN KEY `app_access_modul_app_modul_id_fkey`;

-- AlterTable
ALTER TABLE `app_access_menu` DROP COLUMN `app_menu_id_json`,
    MODIFY `app_menu_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `app_access_modul` MODIFY `app_modul_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `app_access_menu` ADD CONSTRAINT `app_access_menu_app_menu_id_fkey` FOREIGN KEY (`app_menu_id`) REFERENCES `app_menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_access_modul` ADD CONSTRAINT `app_access_modul_app_modul_id_fkey` FOREIGN KEY (`app_modul_id`) REFERENCES `app_modul`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

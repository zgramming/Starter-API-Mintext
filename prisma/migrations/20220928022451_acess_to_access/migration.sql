/*
  Warnings:

  - You are about to drop the `app_acess_modul` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `app_acess_modul` DROP FOREIGN KEY `app_acess_modul_app_group_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `app_acess_modul` DROP FOREIGN KEY `app_acess_modul_app_modul_id_fkey`;

-- DropTable
DROP TABLE `app_acess_modul`;

-- CreateTable
CREATE TABLE `app_access_modul` (
    `id` VARCHAR(191) NOT NULL,
    `app_group_user_id` INTEGER NOT NULL,
    `app_modul_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `app_access_modul` ADD CONSTRAINT `app_access_modul_app_group_user_id_fkey` FOREIGN KEY (`app_group_user_id`) REFERENCES `app_group_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_access_modul` ADD CONSTRAINT `app_access_modul_app_modul_id_fkey` FOREIGN KEY (`app_modul_id`) REFERENCES `app_modul`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

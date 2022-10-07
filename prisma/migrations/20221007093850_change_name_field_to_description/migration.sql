/*
  Warnings:

  - You are about to drop the column `documentation` on the `documentation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `documentation` DROP COLUMN `documentation`,
    ADD COLUMN `description` TEXT NULL;

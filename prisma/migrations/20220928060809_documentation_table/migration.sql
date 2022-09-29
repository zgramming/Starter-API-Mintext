-- CreateTable
CREATE TABLE `documentation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `job_id` INTEGER NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `money` DECIMAL(19, 4) NOT NULL,
    `hobbies` JSON NOT NULL,
    `status` ENUM('active', 'not_active', 'none') NOT NULL,
    `image` TEXT NOT NULL,
    `file` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `documentation_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `documentation` ADD CONSTRAINT `documentation_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `master_data`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

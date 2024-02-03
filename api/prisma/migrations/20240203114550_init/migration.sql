-- CreateTable
CREATE TABLE `prepayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prepayments` ADD CONSTRAINT `prepayments_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

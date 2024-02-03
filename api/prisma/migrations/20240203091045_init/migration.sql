-- CreateTable
CREATE TABLE `workhours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `start` TIME(4) NOT NULL,
    `end` TIME(4) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `position` VARCHAR(100) NOT NULL,
    `pricePerHour` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `workhours` ADD CONSTRAINT `workhours_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

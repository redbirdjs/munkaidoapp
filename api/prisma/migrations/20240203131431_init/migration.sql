/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `prepayments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `prepayments_date_key` ON `prepayments`(`date`);

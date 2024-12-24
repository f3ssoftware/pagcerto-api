/*
  Warnings:

  - You are about to drop the column `enabled` on the `Processor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Processor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Processor" DROP COLUMN "enabled";

-- CreateIndex
CREATE UNIQUE INDEX "Processor_name_key" ON "Processor"("name");

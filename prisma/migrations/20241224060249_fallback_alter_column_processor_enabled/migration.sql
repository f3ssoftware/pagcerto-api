/*
  Warnings:

  - Added the required column `enabled` to the `Processor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Processor" ADD COLUMN     "enabled" BOOLEAN NOT NULL;

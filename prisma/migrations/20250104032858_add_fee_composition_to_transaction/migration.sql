-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fee_composition" JSONB,
ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVALIABLE', 'PAYMENT_CONFIRMATION', 'DELIVERING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "status" "ProductStatus";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("UserID") ON DELETE SET NULL ON UPDATE CASCADE;

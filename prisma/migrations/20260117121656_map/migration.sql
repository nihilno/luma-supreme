/*
  Warnings:

  - You are about to drop the column `session_cart_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `products` table. All the data in the column will be lost.
  - Added the required column `sessionCartId` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropIndex
DROP INDEX "products_is_featured_created_at_idx";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "session_cart_id",
DROP COLUMN "user_id",
ADD COLUMN     "sessionCartId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "created_at",
DROP COLUMN "is_featured",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "products_isFeatured_createdAt_idx" ON "products"("isFeatured", "createdAt");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

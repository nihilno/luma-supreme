/*
  Warnings:

  - You are about to drop the column `product_slug_idx` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_product_slug_idx_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "product_slug_idx",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_is_featured_created_at_idx" ON "products"("is_featured", "created_at");

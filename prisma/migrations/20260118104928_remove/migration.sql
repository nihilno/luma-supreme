-- DropIndex
DROP INDEX "carts_sessionCartId_key";

-- CreateIndex
CREATE INDEX "carts_sessionCartId_idx" ON "carts"("sessionCartId");

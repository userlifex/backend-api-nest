/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `order_products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_id_key" ON "CartProduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_products_id_key" ON "order_products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_key" ON "tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

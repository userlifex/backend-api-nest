-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('REFRESH', 'ACCESS', 'RECOVERY', 'VERIFY');

-- CreateTable
CREATE TABLE "tokens" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "token_type" "TokenType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "products" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT E'ACTIVE',
    "stock" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "orders" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "order_products" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "order_uuid" TEXT NOT NULL,
    "product_uuid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_products_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CartProduct" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "product_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_order_uuid_fkey" FOREIGN KEY ("order_uuid") REFERENCES "orders"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

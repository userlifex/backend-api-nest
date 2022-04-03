-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('VERIFIED', 'UNVERIFIED', 'DISABLED');

-- CreateTable
CREATE TABLE "people" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT,
    "sex" TEXT,
    "phone_number" TEXT,

    CONSTRAINT "people_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "person_uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "status" "UserStatus" NOT NULL DEFAULT E'UNVERIFIED',

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_person_uuid_key" ON "users"("person_uuid");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_person_uuid_fkey" FOREIGN KEY ("person_uuid") REFERENCES "people"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

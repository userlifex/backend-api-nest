/*
  Warnings:

  - You are about to drop the column `person_uuid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_person_uuid_fkey";

-- DropIndex
DROP INDEX "users_person_uuid_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "person_uuid",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "people";

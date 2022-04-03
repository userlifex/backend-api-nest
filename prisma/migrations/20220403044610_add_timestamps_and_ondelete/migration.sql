/*
  Warnings:

  - Added the required column `updated_at` to the `people` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_person_uuid_fkey";

-- AlterTable
ALTER TABLE "people" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_person_uuid_fkey" FOREIGN KEY ("person_uuid") REFERENCES "people"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

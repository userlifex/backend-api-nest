/*
  Warnings:

  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UserStatus";

/*
  Warnings:

  - You are about to drop the column `Owner` on the `Board` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_Owner_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "Owner",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

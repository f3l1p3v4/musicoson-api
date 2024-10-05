/*
  Warnings:

  - You are about to drop the column `instructorId` on the `ProgramMinimum` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgramMinimum" DROP CONSTRAINT "ProgramMinimum_instructorId_fkey";

-- AlterTable
ALTER TABLE "ProgramMinimum" DROP COLUMN "instructorId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "ProgramMinimum" ADD CONSTRAINT "ProgramMinimum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

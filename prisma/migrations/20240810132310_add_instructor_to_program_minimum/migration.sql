/*
  Warnings:

  - You are about to drop the column `userId` on the `ProgramMinimum` table. All the data in the column will be lost.
  - Added the required column `instructorId` to the `ProgramMinimum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProgramMinimum" DROP CONSTRAINT "ProgramMinimum_userId_fkey";

-- AlterTable
ALTER TABLE "ProgramMinimum" DROP COLUMN "userId",
ADD COLUMN     "instructorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProgramMinimum" ADD CONSTRAINT "ProgramMinimum_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `cults` on the `ProgramMinimum` table. All the data in the column will be lost.
  - You are about to drop the column `meetings` on the `ProgramMinimum` table. All the data in the column will be lost.
  - You are about to drop the column `officialization` on the `ProgramMinimum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProgramMinimum" DROP COLUMN "cults",
DROP COLUMN "meetings",
DROP COLUMN "officialization",
ALTER COLUMN "instrument" SET NOT NULL,
ALTER COLUMN "instrument" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "programMinimumId" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cult" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "programMinimumId" TEXT NOT NULL,

    CONSTRAINT "Cult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Officialization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "programMinimumId" TEXT NOT NULL,

    CONSTRAINT "Officialization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgramMinimum" ADD CONSTRAINT "ProgramMinimum_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_programMinimumId_fkey" FOREIGN KEY ("programMinimumId") REFERENCES "ProgramMinimum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cult" ADD CONSTRAINT "Cult_programMinimumId_fkey" FOREIGN KEY ("programMinimumId") REFERENCES "ProgramMinimum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officialization" ADD CONSTRAINT "Officialization_programMinimumId_fkey" FOREIGN KEY ("programMinimumId") REFERENCES "ProgramMinimum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

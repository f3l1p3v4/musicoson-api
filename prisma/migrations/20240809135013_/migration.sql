/*
  Warnings:

  - You are about to drop the `MinimumProgram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MinimumProgram";

-- CreateTable
CREATE TABLE "ProgramMinimum" (
    "id" TEXT NOT NULL,
    "instrument" TEXT[],
    "meetings" JSONB NOT NULL,
    "cults" JSONB NOT NULL,
    "officialization" JSONB NOT NULL,
    "instructorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramMinimum_pkey" PRIMARY KEY ("id")
);

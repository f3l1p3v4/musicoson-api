-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('S1', 'S2');

-- AlterTable
ALTER TABLE "ClassPlan" ADD COLUMN     "semester" "Semester";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "semester" "Semester";

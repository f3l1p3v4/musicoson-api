/*
  Warnings:

  - You are about to drop the column `classPlanId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `classPlanId` on the `ClassPlan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_classPlanId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "classPlanId";

-- AlterTable
ALTER TABLE "ClassPlan" DROP COLUMN "classPlanId";

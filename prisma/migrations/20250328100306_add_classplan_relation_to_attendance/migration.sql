-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "classPlanId" TEXT;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_classPlanId_fkey" FOREIGN KEY ("classPlanId") REFERENCES "ClassPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

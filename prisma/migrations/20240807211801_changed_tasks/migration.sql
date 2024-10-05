-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "delivery_date" TIMESTAMP(3),
ADD COLUMN     "group" "Group",
ADD COLUMN     "observation" TEXT;

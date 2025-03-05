-- CreateTable
CREATE TABLE "ClassPlan" (
    "id" TEXT NOT NULL,
    "group" "Group" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "ClassPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassPlan" ADD CONSTRAINT "ClassPlan_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

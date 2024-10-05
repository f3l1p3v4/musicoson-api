-- CreateTable
CREATE TABLE "MinimumProgram" (
    "id" TEXT NOT NULL,
    "instrument" TEXT[],
    "meetings" JSONB NOT NULL,
    "cults" JSONB NOT NULL,
    "officialization" JSONB NOT NULL,
    "instructorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MinimumProgram_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `fullScore` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "fullScore",
ALTER COLUMN "status" SET DEFAULT 'In Queue',
ALTER COLUMN "time" SET DEFAULT 0,
ALTER COLUMN "memory" SET DEFAULT 0,
ALTER COLUMN "codeLength" SET DEFAULT 0,
ALTER COLUMN "score" SET DEFAULT 0;

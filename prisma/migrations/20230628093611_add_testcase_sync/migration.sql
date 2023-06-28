-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "testcase_sync_status" (
    "task_id" TEXT NOT NULL,
    "last_synced" TIMESTAMP(3) NOT NULL,
    "sync_status" "SyncStatus" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "testcase_sync_status_task_id_key" ON "testcase_sync_status"("task_id");

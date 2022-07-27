/*
  Warnings:

  - Changed the type of `code` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `groups` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "code",
ADD COLUMN     "code" BYTEA NOT NULL,
ALTER COLUMN "groups" SET NOT NULL;

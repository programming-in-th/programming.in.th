-- CreateEnum
CREATE TYPE "ScoringType" AS ENUM ('BEST_SUBMISSION', 'SUM_SUBTASK');

-- AlterTable
ALTER TABLE "assessment" ADD COLUMN     "is_leaderboard_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scoring_type" "ScoringType" NOT NULL DEFAULT 'BEST_SUBMISSION';

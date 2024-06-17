-- CreateEnum
CREATE TYPE "Team" AS ENUM ('Team1', 'Team2', 'Team3', 'Team4');

-- CreateTable
CREATE TABLE "weekly_team" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "team" "Team" NOT NULL,

    CONSTRAINT "weekly_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_results" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "goalsMade" INTEGER NOT NULL,
    "goalsSuffered" INTEGER NOT NULL,

    CONSTRAINT "team_results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weekly_team" ADD CONSTRAINT "fk_team_player" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "weekly_team" ADD CONSTRAINT "fk_team_match" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_results" ADD CONSTRAINT "fk_team_results" FOREIGN KEY ("team_id") REFERENCES "weekly_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

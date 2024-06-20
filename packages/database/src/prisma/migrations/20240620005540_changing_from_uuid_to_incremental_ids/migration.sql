/*
  Warnings:

  - The primary key for the `match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `match` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `match_players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `match_players` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `player_stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `player_stats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `team_results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `team_results` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `weekly_team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `weekly_team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `match_id` on the `match_players` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `player_id` on the `match_players` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `player_id` on the `player_stats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `team_id` on the `team_results` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `match_id` on the `weekly_team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `player_id` on the `weekly_team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "match_players" DROP CONSTRAINT "fk_match_player_match";

-- DropForeignKey
ALTER TABLE "match_players" DROP CONSTRAINT "fk_match_player_player";

-- DropForeignKey
ALTER TABLE "player_stats" DROP CONSTRAINT "fk_player_stats_player";

-- DropForeignKey
ALTER TABLE "team_results" DROP CONSTRAINT "fk_team_results";

-- DropForeignKey
ALTER TABLE "weekly_team" DROP CONSTRAINT "fk_team_match";

-- DropForeignKey
ALTER TABLE "weekly_team" DROP CONSTRAINT "fk_team_player";

-- AlterTable
ALTER TABLE "match" DROP CONSTRAINT "match_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "match_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "match_players" DROP CONSTRAINT "match_players_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "match_id",
ADD COLUMN     "match_id" INTEGER NOT NULL,
DROP COLUMN "player_id",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD CONSTRAINT "match_players_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "player" DROP CONSTRAINT "player_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "player_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "player_stats" DROP CONSTRAINT "player_stats_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "player_id",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD CONSTRAINT "player_stats_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "team_results" DROP CONSTRAINT "team_results_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "team_id",
ADD COLUMN     "team_id" INTEGER NOT NULL,
ADD CONSTRAINT "team_results_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "weekly_team" DROP CONSTRAINT "weekly_team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "match_id",
ADD COLUMN     "match_id" INTEGER NOT NULL,
DROP COLUMN "player_id",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD CONSTRAINT "weekly_team_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "player_stats" ADD CONSTRAINT "fk_player_stats_player" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_players" ADD CONSTRAINT "fk_match_player_match" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "match_players" ADD CONSTRAINT "fk_match_player_player" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "weekly_team" ADD CONSTRAINT "fk_team_player" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "weekly_team" ADD CONSTRAINT "fk_team_match" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_results" ADD CONSTRAINT "fk_team_results" FOREIGN KEY ("team_id") REFERENCES "weekly_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

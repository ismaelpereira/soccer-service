-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ATK', 'DEF', 'MEI', 'GK');

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(365) NOT NULL,
    "team" VARCHAR(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" "Position" NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_stats" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "participations" INTEGER NOT NULL,
    "own_goal" INTEGER NOT NULL,
    "tackles" INTEGER NOT NULL,
    "games_without_suffered_goals" INTEGER NOT NULL,
    "created_plays" INTEGER NOT NULL,
    "goals_suffered" INTEGER NOT NULL,
    "defenses" INTEGER NOT NULL,

    CONSTRAINT "player_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_players" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "participations" INTEGER NOT NULL,
    "own_goal" INTEGER NOT NULL,
    "tackles" INTEGER NOT NULL,
    "games_without_suffered_goals" INTEGER NOT NULL,
    "created_plays" INTEGER NOT NULL,
    "goals_suffered" INTEGER NOT NULL,
    "defenses" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_players_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "player_stats" ADD CONSTRAINT "fk_player_stats_player" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

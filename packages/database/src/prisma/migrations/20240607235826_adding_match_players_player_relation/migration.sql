-- AddForeignKey
ALTER TABLE "match_players" ADD CONSTRAINT "fk_match_player_player" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

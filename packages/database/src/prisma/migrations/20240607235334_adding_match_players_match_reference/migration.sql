-- AddForeignKey
ALTER TABLE "match_players" ADD CONSTRAINT "fk_match_player_match" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

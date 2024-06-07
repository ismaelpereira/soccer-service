import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_PLAYER = gql`
   mutation ($name: String!, $position: String!, $team: String!) {
      createPlayer(name: $name, position: $position, team: $team) {
         name
         position
         team
      }
   }
`;

export function NewPlayerForm() {
   const [name, setName] = useState("");
   const [position, setPosition] = useState("ATK");
   const [team, setTeam] = useState("");
   const [createPlayer, { data, loading, error }] = useMutation(CREATE_PLAYER);

   async function handleCreatePlayer(event: FormEvent) {
      event.preventDefault();
      console.log({
         name,
         position,
         team: team ?? null,
      });
      await createPlayer({
         variables: {
            name,
            position,
            team: team ?? null,
         },
         awaitRefetchQueries: true,
         onCompleted(data, clientOptions) {
            return data;
         },
      });

      console.log(data);
   }

   return (
      <form onSubmit={handleCreatePlayer}>
         <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <select
            name="position"
            id="position"
            onChange={(e) => setPosition(e.target.value)}
         >
            <option value="ATK">ATK</option>
            <option value="DEF">DEF</option>
            <option value="MEI">MEI</option>
            <option value="GK">GK</option>
         </select>
         <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
         />
         <button type="submit">Enviar</button>
      </form>
   );
}

import { gql, useQuery } from "@apollo/client";
import { NewPlayerForm } from "./components/newPlayerForm.component";

type Player = {
   id: string;
   name: string;
   team: string;
   position: string;
};

const GET_PLAYERS = gql`
   query {
      players {
         id
         name
         team
         position
      }
   }
`;

function App() {
   const { data, loading } = useQuery<{ players: Player[] }>(GET_PLAYERS);
   console.log(data);

   if (loading) {
      return <p>Carregando...</p>;
   }

   return (
      <>
         <div>
            <table>
               <thead>
                  <tr>
                     <th>Nome</th>
                     <th>Posição</th>
                     <th>Time</th>
                  </tr>
               </thead>
               <tbody>
                  {data?.players.map((player) => {
                     return (
                        <tr>
                           <td>{player.name}</td>
                           <td>{player.position}</td>
                           <td>{player.team.toUpperCase()}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         <div>
            <NewPlayerForm />
         </div>
      </>
   );
}

export default App;

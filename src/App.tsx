import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";

function App() {
  ///////////////////////////// NOTE: Typescript /////////////////////////////////////////////////
  // REMEMBER! the Typescript compiler doesn't know this selectedGenre variable can store data of type Genre, unless we give it a type parameter of Genre
  // We also want this selectedGenre state variable to be set to null. So we must set the type param to Genre OR null
  // If we leave off the type parameters, the typescript compiler won't let us set the selectedGenre to anything but the type it is initialized to first
  // --> In this case null

  ///////////////////////////// NOTE: Lifting State /////////////////////////////////////////////////
  // We are declaring this useState hook here in the App component for our selectedGenre because:
  // --> We want to share selectedGenre between multiple components
  // --> So we must LIFT the state up to the nearest parent of the components we will be sharing this with
  // --> This way, our <GenreList /> component can notifiy the <App /> component of any changes in the selectedGenre
  // --> Then, we pass the selectedGenre to our <GameGrid /> component as a prop so the games can be filtered
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList onSelectGenre={(genre) => setSelectedGenre(genre)} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;

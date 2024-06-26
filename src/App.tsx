import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genres } from "./hooks/useGenres";
import PlatformFilter from "./components/PlatformFilter";
import { Platform } from "./hooks/useGame";
import SortSelector from "./components/SortSelector";
import GameHeader from "./components/GameHeader";

export interface GameQuery {
  genre: Genres | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

const App = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)
  return (
    <>
      <Grid templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"` //1024px
      }} templateColumns={{
        base: '1fr',
        lg: '200px 1fr'
      }}>
        <GridItem area='nav'>
          <NavBar submitted={(searchText) => setGameQuery({...gameQuery, searchText})} />
        </GridItem>

        <Show above="lg">
          <GridItem area='aside' paddingX={4} >
            <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({...gameQuery, genre})} />
          </GridItem>
        </Show>

        <GridItem area='main' padding={5}>
        <GameHeader gameQuery={gameQuery} />
          <HStack>
            <PlatformFilter selectedPlat={gameQuery.platform} onSelectedPlat={(platform) => setGameQuery({...gameQuery, platform})} />
            <SortSelector selectedSort={gameQuery.sortOrder} onSelect={(sortOrder) => setGameQuery({...gameQuery, sortOrder})} />
          </HStack>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>

      </Grid>
    </>
  );
};

export default App;

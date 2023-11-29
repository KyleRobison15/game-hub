import useData from "./useData";
import { Genre } from "./useGenres";

/**
 * Custom hook for making a GET request to the RAWG.io /games endpoint
 * Custom hooks are great for keeping our code modular and sharing functionality between multiple components
 *
 * In this case, our useGames hook is an excellent way to allow multiple components to GET all the games from our API
 * It also makes our components much cleaner, as we do not need to include the state hooks and axios GET request logic in our components
 */

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

// Our useGames hook returns another function here that returns a more generic useData hook
// We did this because our useData hook is more generic for fetching any kind of data, not just games
// --> See the useData hook for more details
// We pass the endpoint along with the selectedGenre as the axios request params to this useData hook
// The rawg.io API allows a genre ID as a query param which will fetch only games in that genre
// We also need to pass the selectedGenre as a dependency in the dependency array of the useData hook
// --> This is so that the useEffect hook runs every time the selectedGenre changes in our useData hook
const useGames = (selectedGenre: Genre | null) =>
  useData<Game>("/games", { params: { genres: selectedGenre?.id } }, [
    selectedGenre?.id,
  ]);

export default useGames;

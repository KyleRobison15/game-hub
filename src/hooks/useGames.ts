import useData from "./useData";

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

const useGames = () => useData<Game>("/games");

export default useGames;

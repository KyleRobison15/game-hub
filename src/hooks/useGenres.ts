import useData from "./useData";

/**
 * Custom hook for making a GET request to the RAWG.io /genres endpoint
 * Custom hooks are great for keeping our code modular and sharing functionality between multiple components
 *
 * In this case, our useGenres hook is an excellent way to allow multiple components to GET all the game genres from our API
 * It also makes our components much cleaner, as we do not need to include the state hooks and axios GET request logic in our components
 */

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => useData<Genre>("/genres");

export default useGenres;

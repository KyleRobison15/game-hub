import useData from "./useData";

/**
 * Custom hook for making a GET request to the RAWG.io /platforms endpoint
 * Custom hooks are great for keeping our code modular and sharing functionality between multiple components
 *
 * In this case, our usePlatforms hook is an excellent way to allow multiple components to GET all the game platforms from our API
 * It also makes our components much cleaner, as we do not need to include the state hooks and axios GET request logic in our components
 */

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => useData<Platform>("/platforms/lists/parents");

export default usePlatforms;

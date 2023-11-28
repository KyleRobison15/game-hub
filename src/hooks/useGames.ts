import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Here we use the AbortController class that is built into modern browsers
    // This class allows us to cancel/abort async operations
    // It is good practice to use this class to cancel any requests that may no longer be needed
    // --> ie. In the event the user navigates away from the page while the request is still processing
    const controller = new AbortController();

    apiClient
      // Pass a second argument to this function which is a configuration object for our GET request
      // We set the signal property of our config object to the signal from our AbortController class
      // This is how we connect the async process we want to cancel to our AbortController
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        // Check if this error was a result of aborting our GET request
        if (err instanceof CanceledError) {
          // Return without updating state if the GET request was aborted
          return;
        }
        // Otherwise update the error state object
        setError(err.message);
      });

    // Cleanup function for cancelling the fetch request in case the data is no longer needed
    // Clean up functions are fired when the component using this effect hook are UNMOUNTED!
    // So if the component is unmounted before the fetch is complete:
    // --> Cleanup function fires
    // --> controller.abort() is called, which aborts the GET request since we set its signal property to the AbortController signal
    // --> This cancellation is then registered as an error of type CanceledError and we simply return from the effect hook without trying to update our state
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;

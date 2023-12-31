import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

/**
 * Custom hook for making a generic GET request using our apiClient
 */

// Instead of defining our interface based on the exact type of resource we will be fetching,  we instead use a generic type parameter
interface FetchResponse<T> {
  count: number;
  results: T[];
}

// Our custom useData hook will require the endpoint we want to hit for our GET request as a string
// We also want to allow implementations of this useData hook to OPTIONALLY pass additional request configurations if needed:
// --> The AxiosRequestConfig class provides a way for implementations to do various things with the request
// ------> ie. pass data in the request body, add query params etc.
// We also need to include a dependencies array param so that any implementations of this useData hook can re-run the fetch if the desired dep changes
// --> ie. When our useGames hook runs, we want to re-fetch the games from the server when the selectedGenre changes
const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      // Here we use the AbortController class that is built into modern browsers
      // This class allows us to cancel/abort async operations
      // It is good practice to use this class to cancel any requests that may no longer be needed
      // --> ie. In the event the user navigates away from the page while the request is still processing
      const controller = new AbortController();

      // Set the isLoading state to True
      setIsLoading(true);

      apiClient
        // Pass a second argument to this function which is a configuration object for our GET request
        // We set the signal property of our config object to the signal from our AbortController class
        // This is how we connect the async process we want to cancel to our AbortController
        // We also spread the requestConfig object to allow for any additional AxiosRequestConfigs
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results);
          // Set isLoading state back to false if we have completed the request successfully
          setIsLoading(false);
        })
        .catch((err) => {
          // Check if this error was a result of aborting our GET request
          if (err instanceof CanceledError) {
            // Return without updating state if the GET request was aborted
            return;
          }
          // Otherwise update the error state object
          setError(err.message);
          // Set isLoading state back to false if we have encountered an error
          setIsLoading(false);
        });

      // Cleanup function for cancelling the fetch request in case the data is no longer needed
      // Clean up functions are fired when the component using this effect hook are UNMOUNTED!
      // So if the component is unmounted before the fetch is complete:
      // --> Cleanup function fires
      // --> controller.abort() is called, which aborts the GET request since we set its signal property to the AbortController signal
      // --> This cancellation is then registered as an error of type CanceledError and we simply return from the effect hook without trying to update our state
      return () => controller.abort();

      // We need this logic here because our dependencies array can potentially be undefined
      // To avoid this, we only add the deps array if it is truthy
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;

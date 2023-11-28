/**
 * This utility service is used to add paramaters to an existing URL
 * It accepts the URL, along with the target parameter after which you want to add the additional parameters
 * I have made this service reusable
 */

const extendUrlParams = (url: string, target: string, addedParams: string) => {
  // Find the starting position of the target parameter in the URL
  // Then move the position to the end of the parameter
  // The resulting position in the URL is the last character of our target param
  // This is the index of the URL where we want to insert additional paramaters
  const index = url.indexOf(target) + target.length;

  // Get all the characters from the beginning of the URL, to the end of our target parameter
  // Add the additional parameters
  // Add back the remaining characters after our target and added params
  return url.slice(0, index) + addedParams + url.slice(index);
};

export default extendUrlParams;

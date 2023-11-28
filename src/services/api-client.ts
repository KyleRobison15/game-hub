import axios from 'axios';

/**
 * IMPORTANT: I understand this is bad practice to store an API key in the source code that is published to a git repo.
 * 
 * This API key is totally free, and I am not concerned about its visiability for this particular project.
 * 
 * Storing this API key securly would require building a custom backend to act as a proxy between the client app and external API,
 * which would be overkill for this educational project..
 * 
 *  
*/ 

// Here we are configuring our axios instances for making HTTP requests
// In addition to the standard baseUrl and headers proerties, we must include the params property with an API key
    // This key will be sent along with ALL the HTTP requests we make as a query string
export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'f3b1e1942b5a43df971c8103fc41cb86'
    }
})
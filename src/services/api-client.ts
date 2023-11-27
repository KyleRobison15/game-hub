import axios from 'axios';

// Here we are configuring our axios instances for making HTTP requests
// In addition to the standard baseUrl and headers proerties, we must include the params property with an API key
    // This key will be sent along with ALL the HTTP requests we make as a query string
export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'f3b1e1942b5a43df971c8103fc41cb86'
    }
})
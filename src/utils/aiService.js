// src/utils/aiService.js

// 1. Importing the API Key
// 'import.meta.env' is a special Vite feature. It allows you to access environment variables.
// Environment variables are like secret codes or settings that you don't want to hardcode
// directly into your public-facing code (e.g., API keys).
// 'VITE_GEMINI_API_KEY' is a variable that would typically be defined in a '.env' file
// at the root of your project (e.g., VITE_GEMINI_API_KEY="your_actual_key_here").
// This keeps your sensitive API key safe and separate from your main code.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * 2. JSDoc Comment for getEmbeddings function
 * This explains what the 'getEmbeddings' function does, its parameters, and what it returns.
 *
 * Fetches text embeddings from the Google Gemini API.
 * Text embeddings are numerical representations (vectors) of text. Texts with similar meanings
 * will have similar embedding vectors. This is a core concept in many AI applications
 * like chatbots, search, and recommendations.
 *
 * @param {string} text - The input text for which we want to get the embedding.
 * @returns {Promise<number[]>} - A Promise that will eventually resolve to an array of numbers.
 * This array represents the numerical embedding of the input text.
 */
export const getEmbeddings = async (text) => { // 3. Defining the 'getEmbeddings' asynchronous function
  // 'export' makes this function available to be used in other files.
  // 'async' means this function will perform an asynchronous operation (like fetching data from a server).
  // It will use 'await' internally to pause execution until the operation is complete.

  // 4. Making an API Request using 'fetch'
  // 'fetch' is a built-in browser function to make network requests (like getting data from a server).
  const response = await fetch( // 'await' pauses here until the server responds
    // 5. Constructing the API Endpoint URL
    // This is the URL for the Google Gemini API's text embedding service.
    // We append our API key as a query parameter using a template literal (`...${variable}...`).
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
    {
      // 6. Request Configuration Object
      // This object specifies details about our API request.
      method: "POST", // 7. HTTP Method: 'POST' indicates we are sending data to the server.
      headers: { // 8. Request Headers
        // 'Content-Type': 'application/json' tells the server that the data we are sending
        // in the request body is in JSON format. This is crucial for APIs.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // 9. Request Body
        // 'body' contains the actual data we are sending to the API.
        // 'JSON.stringify()' converts a JavaScript object into a JSON string,
        // which is the format the API expects.
        model: "models/text-embedding-004", // Specifies which embedding model to use.
        content: { parts: [{ text: text }] }, // The actual text content to embed.
      }),
    }
  );

  // 10. Error Handling
  // 'response.ok' is true if the HTTP status code is in the 200-299 range (success).
  // If the response is NOT OK (e.g., 400 Bad Request, 401 Unauthorized, 500 Server Error),
  // we read the error message from the response and throw an error to signal failure.
  if (!response.ok) {
    const errorText = await response.text(); // Read the error message from the response body
    throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`); // Throw a new error
  }

  // 11. Parsing the Response
  // 'await response.json()' parses the JSON response from the server into a JavaScript object.
  const data = await response.json();

  // 12. Returning the Embeddings
  // We access the 'embedding.values' property from the parsed data, which contains the array of numbers.
  return data.embedding.values;
};

/**
 * 13. JSDoc Comment for cosineSimilarity function
 * This explains what the 'cosineSimilarity' function does, its parameters, and what it returns.
 *
 * Calculates the cosine similarity between two vectors.
 * A vector is just an array of numbers (like the embeddings we get from the API).
 * Cosine similarity is a measure of similarity between two non-zero vectors of an inner product space.
 * It measures the cosine of the angle between them. A value close to 1 means they are very similar
 * in direction (and thus meaning, for embeddings), and a value close to 0 means they are dissimilar.
 *
 * @param {number[]} vecA - The first vector (array of numbers).
 * @param {number[]} vecB - The second vector (array of numbers).
 * @returns {number} - The cosine similarity score (a number between -1 and 1, usually 0 and 1 for embeddings).
 */
// 14. Additional explanation in comments
// cosine similarity measures how two things are in direction (or semantic meaning, in AI context)
export const cosineSimilarity = (vecA, vecB) => { // 15. Defining the 'cosineSimilarity' function
  // 'export' makes this function available to be used in other files.

  // 16. Initialize variables for calculation
  let dotProduct = 0; // Sum of products of corresponding elements
  let magnitudeA = 0; // Length (magnitude) of vector A squared
  let magnitudeB = 0; // Length (magnitude) of vector B squared

  // 17. Loop through the vectors to calculate dot product and magnitudes
  // We assume both vectors have the same length (which they should for embeddings).
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];      // Add the product of corresponding elements to dotProduct
    magnitudeA += vecA[i] * vecA[i];      // Add square of element A to magnitudeA squared
    magnitudeB += vecB[i] * vecB[i];      // Add square of element B to magnitudeB squared
  }

  // 18. Calculate the actual magnitudes (square root of the sum of squares)
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  // 19. Handle division by zero
  // If either vector has zero magnitude (all elements are zero), similarity is undefined, so we return 0.
  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  // 20. Calculate and return the cosine similarity
  // Formula: dotProduct / (magnitudeA * magnitudeB)
  return dotProduct / (magnitudeA * magnitudeB);
};
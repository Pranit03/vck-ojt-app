// // src/utils/constants.js
// // Define the similarity threshold for matching user queries to the knowledge base
// export const SIMILARITY_THRESHOLD = 0.6; // This value can be tuned: higher = stricter match, lower = looser match


// src/utils/constants.js

// 1. Exporting a Constant Variable
// 'export' makes this variable available to be used in other files in our project.
// 'const' means this is a constant value – its value will not change after it's defined.

// Define the similarity threshold for matching user queries to the knowledge base
// This constant is used in our chatbot logic (which you'll see later!)
// to decide how "similar" a user's question needs to be to one of our
// predefined questions in the knowledge base (like "courses" or "fees")
// before the chatbot gives a specific answer.
export const SIMILARITY_THRESHOLD = 0.6;

// 2. Explanation of the Threshold Value
// This value can be "tuned." Tuning means adjusting it to find the best balance.
// Think of it like a "strictness" setting:
//   - A HIGHER value (e.g., 0.8 or 0.9): Means the user's query needs to be VERY similar
//     to a known question to get a specific answer. If it's not super close,
//     the bot might say "I don't understand." This leads to stricter matches.
//   - A LOWER value (e.g., 0.4 or 0.5): Means the user's query can be somewhat similar
//     to a known question and still get a specific answer. This might lead to
//     more matches, but potentially some irrelevant ones. This leads to looser matches.
// The value 0.6 is a common starting point for many similarity tasks.
// Call API from Claude Sonnet to answer questions
// when in the AI chat box. This doesn't append prev messages to save cost.

// import { useState } from "react";
import Anthropic from "@anthropic-ai/sdk";
import { ContentBlock } from "@anthropic-ai/sdk/resources";
import  { useState } from 'react';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // Allow using in a browser-like environment
});

const useClaudeSonnet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAIResponse] = useState<string | null>(null);

  const sendAIMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);
    setAIResponse(null);

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }],
      });

      const extractedText = response.content
        .filter((block: ContentBlock) => block.type === "text") // Filter for text blocks
        .map((block: ContentBlock) => {
          if ("text" in block) {
            return block.text; // Safely access text property
          }
          return ""; // Return empty string for non-text blocks
        })
        .join(" ") // Join the texts into a single string
        .trim(); // Trim to clean up any extra spaces

      setAIResponse(extractedText || null); // Set response as string or null
    } catch (err) {
      setError("Error: Unable to fetch response from AI.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendAIMessage, aiResponse, isLoading, error };
};

export default useClaudeSonnet;

import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

const NewsData = ({ article }) => {
  const geminiAPIKey = "AIzaSyCiaHzDpsLw9XS8q0tcOJyi6BYSxTLfs9M"; // Replace with your Gemini API key
  const genAI = new GoogleGenerativeAI(geminiAPIKey);

  const [authenticity, setAuthenticity] = useState("");
  const [classification, setClassification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function authenticateNewsGemini(article) {
    setIsLoading(true);
    try {
      // Assuming genAI is correctly instantiated above
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Assess the likelihood of this news headline in this format: ["news_category","accuracy_likelihood"], first the "news_category" and second "accuracy_likelihood" being accurate and give me the classification of the news such as sports, weather, political etc. Respond with a percentage (e.g., 85%).\nHeadline: "${article}. Also keep the same language"`;
      const result = await model.generateContent(prompt);
      setIsLoading(false);
      const response = result.response;
      const text = JSON.parse(response.text());

      setClassification(text[0]);
      setAuthenticity(text[1]);
    } catch (error) {
      console.log("Error authenticating news (Gemini): " + error);
    }
  }

  return (
    <div className="article-container">
      <span className="article-title">{article}</span>
      <span className="article-classification">
        {article.classification || classification}
      </span>
      <span className="article-authpercent">
        {article.authenticityPercent || authenticity}
      </span>
      <button onClick={() => authenticateNewsGemini(article)}>
        {isLoading ? (
          <BeatLoader
            color={"blue"}
            loading={true}
            size={8}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Verify"
        )}
      </button>
    </div>
  );
};

export default NewsData;

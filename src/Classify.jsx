import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Classify = () => {
  const geminiAPIKey = "AIzaSyBoQyFY8mATOvs1JOIEX80-08AB0jtvNa8"; // Replace with your Gemini API key
  const genAI = new GoogleGenerativeAI(geminiAPIKey);
  const newsAPIKey = "54ca9a87568d4f4cbf89e72e99f88f83"; // Replace with your News API key
  function showError(message) {
    alert(message); // Or a more sophisticated error display
  }
  async function classifyNewsGemini(article) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Classify this news headline into one of these categories: Politics, Sports, Entertainment, Business, Technology.\nHeadline: "${article}`;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text();
        document.getElementById('classification').innerText = text.trim()
        }
      
    catch (error) {
      showError("Error classifying news (Gemini): " + error);
    }
  }

  async function authenticateNewsGemini(article) {
    try {
      // Assuming genAI is correctly instantiated above
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Assess the likelihood of this news headline being accurate. Respond with a percentage (e.g., 85%).\nHeadline: "${article}"`;
  
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();
      console.log(text);
      console.log(response);
  
      // Assuming response contains text data directly; update if response needs further parsing
      document.getElementById("authenticity").innerText = `Authenticity (Gemini): ${text.trim()}`;
    } catch (error) {
      showError("Error authenticating news (Gemini): " + error);
    }
  }
  
  async function fetchNews() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      if (data.articles && data.articles.length > 0) {
        const article = data.articles[0].title;
        document.getElementById("news-article").innerText = article;
        classifyNewsGemini(article);
        authenticateNewsGemini(article);
      } else {
        showError("Error fetching news.");
      }
    } catch (error) {
      showError("Error fetching news: " + error);
    }
  }

  // ... rest of your code (fetchNews and showError functions) ...
  fetchNews();

  return (
    <div>
        <h1>AI-Powered News Classification and Authentication</h1>
    <div class="container">
        <div class="column" id="random-news">
            <h2>Random News</h2>
            <p id="news-article">Fetching news...</p>
        </div>
        <div class="column">
            <h2>Classification</h2>
            <p id="classification">Classifying...</p>
        </div>
        <div class="column">
            <h2>Authentication</h2>
            <p id="authenticity">Authenticating...</p>
        </div>
    </div>
    </div>
  );
};

export default Classify;

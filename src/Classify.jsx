import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import NewsData from "./components/unit/news-data";

const Classify = () => {
  // const geminiAPIKey = "AIzaSyBoQyFY8mATOvs1JOIEX80-08AB0jtvNa8"; // Replace with your Gemini API key
  const geminiAPIKey = "AIzaSyCiaHzDpsLw9XS8q0tcOJyi6BYSxTLfs9M"; // Replace with your Gemini API key
  const genAI = new GoogleGenerativeAI(geminiAPIKey);
  const newsAPIKey = "54ca9a87568d4f4cbf89e72e99f88f83"; // Replace with your News API key

  const [fetchedNews, setFetchedNews] = useState([]);
  const [searchInput, setSearchInput] = useState("english");

  async function fetchNews() {
    // try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Give me 20 short news with word count of 20 to 30 words in ${searchInput} only without any other text, just with the actual news headline`;
    const result = await model.generateContent(prompt);

    const dataResults = result.candidates[0].content.parts[0].split("\n");
    setFetchedNews([...fetchedNews, dataResults]);

    console.log(
      "********************result, result.candidates[0].content.parts[0]",
      result
    );
    return;
  }

  function loadMoreNews() {
    fetchNews();
    // .then((response) =>
    //   setFetchedNews([...response.articles, ...fetchedNews])
    // )
    // .catch((err) => alert(err));
  }

  useEffect(() => {
    fetchNews();
  });

  // console.log("*****************fetched news", fetchedNews);
  console.log("search innput", searchInput);

  return (
    <div>
      <div className="master-container">
        <div className="inner-container">
          <div className="inner-title">
            {" "}
            <span>News classification App</span>
            <button className="load-more" onClick={() => loadMoreNews()}>
              Load More News
            </button>
          </div>
          <div className="searchContainer">
            <select onChange={(e) => setSearchInput(e.target.value)}>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="bengali">Bengali</option>
            </select>
            <button
              onClick={async () => {
                setFetchedNews([]);
                await fetchNews();
              }}
            >
              Search
            </button>
          </div>
          <div className="articles-container">
            <div className="articles-header">
              <div className="title">Title</div>
              <div className="title">Classification</div>
              <div className="title">Authenticity</div>
            </div>
            <div className="articles-data">
              {fetchedNews.map((article, index) => (
                <NewsData key={index} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classify;

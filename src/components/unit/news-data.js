import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

const NewsData = (props) => {
  const geminiAPIKey = "AIzaSyBoQyFY8mATOvs1JOIEX80-08AB0jtvNa8"; // Replace with your Gemini API key
  const genAI = new GoogleGenerativeAI(geminiAPIKey);

  const [authenticity, setAuthenticity] = useState('')
  const [classification, setClassification] = useState('')

  async function authenticateNewsGemini(article) {
    try {
      // Assuming genAI is correctly instantiated above
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Assess the likelihood of this news headline in a json object without any prefix to the object keeping only 2 parameters "news_category" and "accuracy_likelihood" being accurate and give me the classification of the news such as sports, weather, political etc. Respond with a percentage (e.g., 85%).\nHeadline: "${article.title}"`;

      const result = await model.generateContent(prompt);
      const response = result.response;


      const text = response.text();
      const delimiters = /{}/;
      const formattedStr = text.split(delimiters);

      console.log('***********8formattedStr', formattedStr)

      setAuthenticity('70%')
      setClassification('Political')

      console.log('###########text', (text))
    } catch (error) {
      console.log("Error authenticating news (Gemini): " + error);
    }
  }


  // authenticateNewsGemini('################props from news data', props)

  return (
    <div className='article-container'>
      <div className='article-title'>
        {props.article.title}
      </div>
      <div className='article-classification'>
        {props.article.classification || classification}
      </div>
      <div className='article-authpercent'>
        {props.article.authenticityPercent || authenticity}
      </div>
      <button onClick={() => authenticateNewsGemini(props.article)} >verify</button>
    </div>
  )
}

export default NewsData
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { OpenAI } = require("openai");
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const path = require('path');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './client')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

// Extract function using openai
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.post("/analyze/openai", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const { data: html } = await axios.get(url);
    const plainText = extractTextFromHTML(html).slice(0, 4000);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
  Summarize the following content into a JSON object with two keys:
  
  1. "summary": an array of 1-2 sections like "Overview", "Main Idea" etc. Each section has:
     - section: string
     - content: string
  
  2. "keyPoints": an array of key bullet points. Each item has:
     - section: string
     - content: string
  
  Return **only valid JSON**. Here's the content:
  
  """ 
  ${plainText}
  """
            `,
        },
      ],
      temperature: 0.5,
    });

    const aiText = response.choices[0].message.content;

    // Try parsing the AI's response
    const jsonResponse = JSON.parse(aiText);

    res.json(jsonResponse);
  } catch (err) {
    console.error("Error in /analyze:", err.message);
    res.status(500).json({ error: "Failed to analyze the URL" });
  }
});

function extractTextFromHTML(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract function without third party Ai

// Function for summarize text for show client
function summarize(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const maxSentences = Math.min(sentences.length, 10);

  const overview = sentences.slice(0, 2).join(" ");
  const mainIdea = sentences.slice(2, 5).join(" ");

  const keyPoints = sentences
    .slice(0, maxSentences)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(" ").length >= 3)
    .slice(0, 10)
    .map((sentence, i) => ({
      section: `Point ${i + 1}`,
      content: sentence
    }));

  while (keyPoints.length < 5) {
    keyPoints.push({
      section: `Point ${keyPoints.length + 1}`,
      content: "No meaningful point found."
    });
  }

  return {
    summary: [
      { section: "Overview", content: overview },
      { section: "Main Idea", content: mainIdea }
    ],
    keyPoints: keyPoints
  };
}

// Function for remove tags and attribute

function cleanText(text) {
  return text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);

    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);

    // Parse the article using Readability
    const article = reader.parse();

    if (!article || !article.textContent) {
      return res
        .status(400)
        .json({ error: "Could not extract article content." });
    }

    // Clean the extracted content
    const cleanContent = cleanText(article.textContent);

    // Summarize the cleaned content
    const summary = summarize(cleanContent);

    // Return the summary as a JSON response
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to process the URL." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

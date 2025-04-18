import React, { useState } from "react";
import "./App.css";
import UrlInputPage from "./Pages/UrlInputPage";
import ResultTable from "./Pages/ResultTable";

function App() {
  const [result, setResult] = useState(null);
  const [analyzedDate, setAnalyzedDate] = useState("");
  const [analyzedUrl, setaAnalyzedUrl] = useState("");

  const handleViewResult = async (resultData) => {
    setAnalyzedDate(
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
    setResult(resultData);
  };

  return (
    <div className="w-full min-w-[70%] min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800">
      <header className="w-full text-center py-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
          AI-Powered Content Extractor
        </h1>
        <p className="text-lg sm:text-xl max-w-4xl mx-auto">
          Paste any public URL and let AI summarize the content & extract key
          points instantly.
        </p>
      </header>

      <main className="w-full px-4">
        <UrlInputPage {...{ handleViewResult, setResult, setaAnalyzedUrl }} />
        {result && <ResultTable {...{ result, analyzedDate, analyzedUrl }} />}
      </main>

      <footer className="w-full text-center text-sm text-gray-500 py-6">
        Built with ❤️ by Durai • Highperformer.ai Task
      </footer>
    </div>
  );
}

export default App;

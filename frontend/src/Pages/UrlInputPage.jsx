import React, { useState } from "react";
import axios from "axios";

const UrlInputPage = ({ handleViewResult, setResult, setaAnalyzedUrl }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("https://ai-powered-content-extractor.onrender.com/analyze", {
        url: url.trim(),
      });
      console.log("Response:", res.data);
      handleViewResult(res.data);
      setaAnalyzedUrl(url.trim());
      setUrl("");
    } catch {
      handleViewResult(null);
      setError("Failed to analyze the URL. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setError(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 p-4 max-w-3xl mx-auto"
      >
        <input
          type="url"
          placeholder="Paste any public URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!url.trim() || loading}
            className={`px-6 py-3 flex items-center justify-center gap-2 rounded-lg shadow-md font-semibold transition duration-300 ease-in-out transform ${
              !url.trim() || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                : "bg-white hover:bg-gray-100 text-blue-700 hover:-translate-y-1 hover:shadow-lg"
            }`}
          >
            {loading && (
              <svg
                className="w-5 h-5 text-blue-700 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform ${"bg-red-100 text-red-600 hover:bg-red-200 hover:-translate-y-1 hover:shadow"}`}
          >
            Clear
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </>
  );
};

export default UrlInputPage;

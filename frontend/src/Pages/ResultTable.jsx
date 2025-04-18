import React, { useState } from "react";

const ResultTable = ({ result, analyzedDate, analyzedUrl }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!result) return null;
  const { summary, keyPoints } = result;

  const filteredSummary = summary.filter((row) =>
    row.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredKeyPoints = keyPoints.filter((row) =>
    row.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Metadata Section */}
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Content Metadata
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          URL:{" "}
          <a href={analyzedUrl} className="text-blue-600">
            {analyzedUrl}
          </a>
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Last Analyzed: <span className="font-semibold">{analyzedDate}</span>
        </p>
      </div>

      {/* Content Analysis Section */}
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Content Analysis
        </h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          {/* Table */}
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 w-1/4">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Content
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Summary Section */}
              <tr className="bg-gray-50">
                <td
                  colSpan="2"
                  className="px-6 py-3 font-semibold text-gray-800 text-left bg-gray-100"
                >
                  Summary
                </td>
              </tr>
              {filteredSummary.length > 0 ? (
                filteredSummary.map((row, i) => (
                  <tr
                    key={`summary-${i}`}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 text-left">
                      {row.section}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-left">
                      {row.content}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="px-6 py-4 text-sm text-gray-500 italic"
                  >
                    No matching summary content found.
                  </td>
                </tr>
              )}

              {/* Key Points Section */}
              <tr className="bg-gray-50">
                <td
                  colSpan="2"
                  className="px-6 py-3 font-semibold text-gray-800 text-left bg-gray-100"
                >
                  Key Points
                </td>
              </tr>
              {filteredKeyPoints.length > 0 ? (
                filteredKeyPoints.map((row, i) => (
                  <tr
                    key={`keypoints-${i}`}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 text-left">
                      {row.section}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-left">
                      {row.content}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="px-6 py-4 text-sm text-gray-500 italic"
                  >
                    No matching key points found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ResultTable;

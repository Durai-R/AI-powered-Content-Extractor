import React from "react";

const WelcomeScreen = ({ setShowWelcome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-4 animate-fade-in">
        Welcome to <span className="text-pink-600">AI-Powered</span> Content
        Extractor
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-xl animate-fade-in delay-100">
        Built with ❤️ by <span className="font-semibold">Durai</span> •
        Highperformer.ai Task
      </p>

      <p className="text-base md:text-lg italic text-gray-600 mb-2 animate-fade-in delay-200">
        ✨ Revolutionizing the way you digest the web. Paste any URL and let our
        smart AI chef cook you a gourmet summary of knowledge.
      </p>
      <p className="text-base md:text-lg text-gray-600 max-w-lg mb-10 animate-fade-in delay-300">
        🤖 Think of this as your AI highlighter on steroids. Less reading, more
        knowing.
      </p>
      <div className="flex space-x-4 mb-12">
        <div className="w-4 h-4 bg-blue-500 rounded-full bounce-delay-0"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full bounce-delay-1"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full bounce-delay-2"></div>
      </div>

      <button
        onClick={() => setShowWelcome(false)}
        className="px-6 py-3 text-lg bg-indigo-600 text-blue rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:bg-indigo-700"
      >
        🚀 Get Started
      </button>
    </div>
  );
};

export default WelcomeScreen;

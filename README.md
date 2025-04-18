# 🧠 AI-powered Content Extractor

This is a full-stack application that allows users to input any public URL. It extracts and cleans the article content using AI-based logic, generates a summary and key points, and displays them in a Notion-like searchable and filterable table view.

---

## 🧑‍💻 Author

**Durai R**  
🔗 [GitHub Profile](https://github.com/Durai-R)  
📧 [Email](mailto:duraitech5448@gmail.com)  
🌐 [Portfolio](https://durai-portfolio-omega.vercel.app/)

---

## 🚀 Live Demo

🌍 [Live App on Vercel](https://ai-powered-content-extractor-durai-rs-projects.vercel.app/)

📁 [GitHub Repository](https://github.com/Durai-R/AI-powered-Content-Extractor)

---

## 📌 Features

- 🔗 URL-based content extraction
- ✨ AI-style rule-based summarization
- 📑 Overview, Main Ideas & Key Points
- 🧾 Notion-style table UI with filter/search
- 🔍 Real-time filtering and search
- ⚡ Clean, responsive UI

---

## 🛠 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- React Table
- Axios

### 🔹 Backend
- Node.js + Express
- Axios
- JSDOM + @mozilla/readability
- Custom summarization logic

### 🔹 Deployment
- Frontend: [Vercel](https://ai-powered-content-extractor-durai-rs-projects.vercel.app/)
- Backend: [Railway](https://ai-powered-content-extractor.onrender.com)

---

## ⚙️ How It Works

1. User submits a public URL.
2. Backend scrapes and extracts readable text.
3. Cleans the HTML and runs it through a custom `summarize()` function.
4. Returns structured summary and key points.
5. Frontend renders the output in a Notion-like table view.

---

## 🧪 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Durai-R/AI-powered-Content-Extractor
cd ai-content-extractor

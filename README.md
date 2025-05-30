# Silverlight - Website Technology & Page Analyzer

**Silverlight** is a full-stack web application that analyzes a given website by:
- Detecting technologies used (via BuiltWith API)
- Estimating the number of internal pages using a simple internal crawler

It supports multiple simultaneous analyses, stores them in localStorage, and displays results with pagination (3 results per page).

---

## 🧩 Features

- 🔍 Analyze any website URL
- ⚙️ BuiltWith API integration to detect tech stack
- 📄 Estimate number of internal pages
- 🧠 Multiple analyses can run simultaneously
- 💾 Analyses stored in browser's localStorage
- 📑 Paginated results (3 per page)
- 🔗 Detailed view for each analysis

---

## 📁 Project Structure

```bash


SILVERLIGHT/
├── backend/                 # Node.js + Express API
│   ├── routes/             # /analyse endpoint
│   ├── services/           # BuiltWith & Page count analysis services
│   ├── utils/              # HTML content fetching utility
│   ├── app.js              # Backend entry point
│   ├── .env                # Environment variables (e.g. BUILTWITH_API_KEY)
│   └── package.json        # Backend dependencies and scripts
│  
│
└── frontend/               # React-based frontend app
    ├── public/             # Contains index.html
    └── package.json        # Frontend dependencies and scripts 
    └── src/
        ├── pages/          # Page components (Home.js & Detail.js)
        ├── styles/         # CSS files
        ├── App.js          # Routing configuration
        └── index.js        # ReactDOM entry point
     


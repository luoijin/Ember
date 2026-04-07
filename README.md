# 🔥 Ember

> A free, fast, and cinematic streaming experience — watch movies and TV shows instantly, no sign-up required.

Ember is an open-source streaming web app inspired by [Cineby](https://cineby.gd), built to deliver a clean, premium viewing experience for everyone.

---

## ✨ Features

- 🎬 Stream movies and TV shows for free
- 🔍 Search across a vast content library
- 📺 Clean, distraction-free player
- 🌙 Dark mode UI optimized for viewing
- ⚡ Fast loading with no login required
- 📱 Responsive design for all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS |
| Backend | FastAPI, Python |
| Data | Web Scraping, REST APIs |
| Deployment | Vercel / Railway |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ember-stream/ember.git
cd ember

# Install frontend dependencies
cd client
npm install
npm run dev

# Install backend dependencies
cd ../server
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📁 Project Structure

```
ember/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── server/          # FastAPI backend
│   ├── routes/
│   ├── scrapers/
│   └── main.py
└── README.md
```

---

## 👥 Contributors

| Avatar | Name | GitHub | Contributions |
|--------|------|--------|---------------|
| 👩‍💻 | **Anne Loraine Pardillo** | [@annepardillo](https://github.com/annepardillo) | Project Lead, UI/UX, Frontend Developer |
| 👨‍💻 | **Jan Nino Andrie Bansag** | [@janbansag](https://github.com/janbansag) | Backend Developer, API Integration |

---

## ⚠️ Disclaimer

Ember does not host any media files. All content is sourced from third-party providers. This project is intended for **educational purposes only**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with 🔥 by the Ember team</p>
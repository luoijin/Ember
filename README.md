# 🔥 Ember

> A free, fast, and cinematic streaming experience — watch movies and TV shows instantly, no sign-up required.

Ember is an open-source streaming web app inspired by [Cineby](https://cineby.gd), built to deliver a clean, premium viewing experience for everyone.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | |
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

# Install dependencies
npm install
npm install react-router-dom
npm install @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
npm run dev

# Put on .env
VITE_TMDB_API_KEY={key}
```

---

## 📁 Project Structure

```

EMBER/
├── client/src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   └── Button.css
│   │   │   ├── Container/
│   │   │   │   └── Container.css
│   │   │   └── LoadingSpinner/
│   │   │       ├── LoadingSpinner.css
│   │   │       └── LoadingSpinner.jsx
│   │   ├── layout/
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.css
│   │   │   │   └── Footer.jsx
│   │   │   ├── Header/
│   │   │   │   ├── Header.css
│   │   │   │   └── Header.jsx
│   │   │   └── Layout/
│   │   │       ├── Layout.css
│   │   │       └── Layout.jsx
│   │   └── movies/
│   │       ├── MovieCard/
│   │       │   ├── MovieCard.css
│   │       │   └── MovieCard.jsx
│   │       ├── MovieDetails/
│   │       │   ├── MovieDetails.css
│   │       │   └── Moviedetails.jsx
│   │       ├── MovieGrid/
│   │       │   ├── MovieGrid.css
│   │       │   └── MovieGrid.jsx
│   │       ├── RatingStars/
│   │       │   ├── RatingStars.css
│   │       │   └── RatingStars.jsx
│   │       └── TrailerEmbed/
│   │           ├── TrailerEmbed.css
│   │           └── TrailerEmbed.jsx
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── Favorites/
│   │   ├── Home/
│   │   │   ├── Home.css
│   │   │   └── Home.jsx
│   │   ├── MovieDetails/
│   │   │   ├── MovieDetails.css
│   │   │   └── MovieDetails.jsx
│   │   ├── Search/
│   │   └── Watch/
│   │       ├── Watch.css
│   │       └── Watch.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── animations.css
│   │   ├── global.css
│   │   ├── reset.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

---

## 👥 Contributors

| Avatar | Name | GitHub | Contributions |
|--------|------|--------|---------------|
| <img src="https://github.com/luoijin.png" width="50" height="50"/> | **Anne Loraine Pardillo** | [@luoijin](https://github.com/luoijin) | |
| <img src="https://github.com/janninobansag.png" width="50" height="50"/> | **Jan Nino Andrie Bansag** | [@janxxy](https://github.com/janninobansag) | |
| <img src="https://github.com/raymondchavez333.png" width="50" height="50"/> | **Raymond Chavez** | [@raymondchavez333](https://github.com/raymondchavez333) | |

---

## ⚠️ Disclaimer

Ember does not host any media files. All content is sourced from third-party providers. This project is intended for **educational purposes only**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with 🔥 by the Ember team</p>

import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import "./styles/global.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/terms" element={<Terms />} /> 
          <Route path="/contact" element={<Contact />} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
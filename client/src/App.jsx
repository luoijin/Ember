import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home/Home.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </>
  );
}

export default App;
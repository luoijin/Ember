import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import MovieDetails from "./pages/Moviedetails/MovieDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/watch/:id" element={<Watch />} />
    </Routes>
  );
}

export default App;
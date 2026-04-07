import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: "16px", cursor: "pointer" }}
      >
        ← Back
      </button>
      <iframe
        src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
        width="100%"
        height="600px"
        allowFullScreen
        allow="autoplay; fullscreen"
        style={{ border: "none", display: "block" }}
      />
    </div>
  );
};

export default Watch;
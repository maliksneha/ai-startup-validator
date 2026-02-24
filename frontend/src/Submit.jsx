import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function Submit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitIdea = async () => {
    if (!title || !description) return alert("Fill all fields");

    setLoading(true);

    const res = await fetch(`${API}/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description })
    });

    await res.json();
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div>
      <input
        placeholder="Startup Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <textarea
        placeholder="Startup Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />
      <button onClick={submitIdea}>
        {loading ? "Generating..." : "Validate Idea"}
      </button>
    </div>
  );
}
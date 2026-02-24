import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch(`${API}/ideas`)
      .then(res => res.json())
      .then(data => setIdeas(data));
  }, []);

  const deleteIdea = async (id) => {
    await fetch(`${API}/ideas/${id}`, {
      method: "DELETE"
    });

    setIdeas(ideas.filter(i => i._id !== id));
  };

  return (
    <div>
      <h2>All Ideas</h2>

      {ideas.map((idea) => (
        <div key={idea._id} style={{ marginBottom: 15 }}>
          <h3>{idea.title}</h3>
          <Link to={`/ideas/${idea._id}`}>View Details</Link>
          <button 
            onClick={() => deleteIdea(idea._id)} 
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
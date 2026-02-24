import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (temporary for demo)
let ideas = [];

/* ===========================
   Health Check Route
=========================== */
app.get("/", (req, res) => {
  res.status(200).send("API Running");
});

/* ===========================
   Create Idea
=========================== */
app.post("/ideas", (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }

    const report = {
      problem:
        "The startup addresses inefficiencies where users lack structured and automated solutions.",
      customer:
        "Students and digital-first users seeking smarter productivity tools.",
      market:
        "The AI-powered productivity market is growing rapidly with strong adoption.",
      competitor: [
        "Notion – General productivity tool.",
        "IdeaBuddy – Idea planning tool.",
        "CB Insights – Market research platform."
      ],
      tech_stack: ["React", "Node.js", "Express"],
      risk_level: "Medium",
      profitability_score: 80,
      justification:
        "Strong digital demand with scalable SaaS model and recurring subscription potential."
    };

    const newIdea = {
      id: Date.now().toString(),
      title,
      description,
      report
    };

    ideas.push(newIdea);

    return res.status(200).json(newIdea);

  } catch (error) {
    console.error("POST /ideas Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

/* ===========================
   Get All Ideas
=========================== */
app.get("/ideas", (req, res) => {
  return res.status(200).json(ideas);
});

/* ===========================
   Get Single Idea
=========================== */
app.get("/ideas/:id", (req, res) => {
  const idea = ideas.find(i => i.id === req.params.id);

  if (!idea) {
    return res.status(404).json({ error: "Idea not found" });
  }

  return res.status(200).json(idea);
});

/* ===========================
   Delete Idea
=========================== */
app.delete("/ideas/:id", (req, res) => {
  ideas = ideas.filter(i => i.id !== req.params.id);
  return res.status(200).json({ message: "Idea deleted successfully" });
});

/* ===========================
   Start Server
=========================== */
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
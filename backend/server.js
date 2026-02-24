import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let ideas = [];

// Health check
app.get("/", (req, res) => {
  res.send("API Running");
});

// Create idea
app.post("/ideas", (req, res) => {
  const { title, description } = req.body;

  const report = {
    problem: "The startup addresses inefficiencies where users lack structured and automated solutions.",
    customer: "Students and digital-first users seeking smarter productivity tools.",
    market: "The AI-powered productivity market is growing rapidly with strong adoption.",
    competitor: [
      "Notion – General productivity tool.",
      "IdeaBuddy – Idea planning tool.",
      "CB Insights – Market research platform."
    ],
    tech_stack: ["React", "Node.js", "Express"],
    risk_level: "Medium",
    profitability_score: 80,
    justification: "Strong digital demand with scalable SaaS model."
  };

  const newIdea = {
    id: Date.now().toString(),
    title,
    description,
    report
  };

  ideas.push(newIdea);

  res.json(newIdea);
});

// Get all ideas
app.get("/ideas", (req, res) => {
  res.json(ideas);
});

// Get single idea
app.get("/ideas/:id", (req, res) => {
  const idea = ideas.find(i => i.id === req.params.id);
  res.json(idea);
});

// Delete idea
app.delete("/ideas/:id", (req, res) => {
  ideas = ideas.filter(i => i.id !== req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
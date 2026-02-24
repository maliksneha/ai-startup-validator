import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin:"*",
  methods:["GET","POST","DELETE"],
}));

app.use(express.json());

/* ===========================
   MongoDB Connection
=========================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

/* ===========================
   Schema
=========================== */
const IdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  report: {
    problem: String,
    customer: String,
    market: String,
    competitor: [String],
    tech_stack: [String],
    risk_level: String,
    profitability_score: Number,
    justification: String
  }
}, { timestamps: true });

const Idea = mongoose.model("Idea", IdeaSchema);

/* ===========================
   Health Check Route
=========================== */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ===========================
   POST /ideas  (Mock AI)
=========================== */
app.post("/ideas", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Mock AI Response
    const report = {
      problem: "The startup addresses inefficiencies where users lack structured and automated solutions.",
      customer: "Students, young professionals, and digital-first users looking for smarter productivity tools.",
      market: "The digital tools and AI-based productivity market is rapidly growing globally with increasing adoption.",
      competitor: [
        "Notion – Offers productivity tools but lacks deep AI-driven validation features.",
        "CB Insights – Provides market research but not startup-level instant validation.",
        "IdeaBuddy – Helps plan ideas but lacks automated AI scoring."
      ],
      tech_stack: ["React", "Node.js", "Express", "MongoDB"],
      risk_level: "Medium",
      profitability_score: 80,
      justification: "The idea has strong scalability and digital demand, but execution quality and differentiation will determine success."
    };

    const newIdea = await Idea.create({
      title,
      description,
      report
    });

    res.json(newIdea);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/* ===========================
   GET /ideas
=========================== */
app.get("/ideas", async (req, res) => {
  const ideas = await Idea.find().sort({ createdAt: -1 });
  res.json(ideas);
});

/* ===========================
   GET /ideas/:id
=========================== */
app.get("/ideas/:id", async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  res.json(idea);
});

/* ===========================
   DELETE /ideas/:id
=========================== */
app.delete("/ideas/:id", async (req, res) => {
  await Idea.findByIdAndDelete(req.params.id);
  res.json({ message: "Idea deleted successfully" });
});

/* ===========================
   Start Server
=========================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
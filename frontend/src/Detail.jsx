import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const API = "http://localhost:5000";

export default function Detail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    fetch(`${API}/ideas/${id}`)
      .then(res => res.json())
      .then(data => setIdea(data));
  }, [id]);

  if (!idea) return <p>Loading...</p>;

  const downloadPDF = () => {
    const doc = new jsPDF();

    let y = 10;

    doc.text(`Startup Idea: ${idea.title}`, 10, y);
    y += 10;

    doc.text(`Problem:`, 10, y);
    y += 8;
    doc.text(idea.report.problem, 10, y, { maxWidth: 180 });
    y += 15;

    doc.text(`Customer:`, 10, y);
    y += 8;
    doc.text(idea.report.customer, 10, y, { maxWidth: 180 });
    y += 15;

    doc.text(`Market:`, 10, y);
    y += 8;
    doc.text(idea.report.market, 10, y, { maxWidth: 180 });
    y += 15;

    doc.text(`Risk Level: ${idea.report.risk_level}`, 10, y);
    y += 10;

    doc.text(`Profitability Score: ${idea.report.profitability_score}/100`, 10, y);
    y += 10;

    doc.text(`Justification:`, 10, y);
    y += 8;
    doc.text(idea.report.justification, 10, y, { maxWidth: 180 });

    doc.save(`${idea.title}.pdf`);
  };

  return (
    <div>
      <h2>{idea.title}</h2>

      <button 
        onClick={downloadPDF} 
        style={{ marginBottom: 20 }}
      >
        Download PDF
      </button>

      <h3>Problem</h3>
      <p>{idea.report.problem}</p>

      <h3>Customer</h3>
      <p>{idea.report.customer}</p>

      <h3>Market</h3>
      <p>{idea.report.market}</p>

      <h3>Competitors</h3>
      <ul>
        {idea.report.competitor.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3>Tech Stack</h3>
      <ul>
        {idea.report.tech_stack.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <h3>Risk Level</h3>
      <p>{idea.report.risk_level}</p>

      <h3>Profitability Score</h3>
      <p>{idea.report.profitability_score}/100</p>

      <h3>Justification</h3>
      <p>{idea.report.justification}</p>
    </div>
  );
}
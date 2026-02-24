const handleSubmit = async () => {
  try {
    const res = await fetch(`${API}/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    const text = await res.text(); // get raw response

    if (!text) {
      alert("No response from server");
      return;
    }

    const data = JSON.parse(text);
    setResponse(data);

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
};
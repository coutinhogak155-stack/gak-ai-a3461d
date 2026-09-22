export default async (request) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5.6";

  if (!apiKey) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured in Netlify." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return Response.json({ error: "Please enter a message." }, { status: 400 });
  }

  if (message.length > 12000) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        instructions:
          "You are GAK AI, a helpful, clear and friendly AI assistant. " +
          "Answer the user's question accurately. Explain difficult topics simply. " +
          "Do not claim to have performed actions you did not perform.",
        input: message,
        max_output_tokens: 1200
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI API error:", data);
      return Response.json(
        { error: data?.error?.message || "OpenAI API request failed." },
        { status: openaiResponse.status }
      );
    }

    const reply = data?.output_text;

    if (!reply) {
      return Response.json(
        { error: "The AI returned no text response." },
        { status: 502 }
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json(
      { error: "Unable to connect to the AI service." },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/chat"
};

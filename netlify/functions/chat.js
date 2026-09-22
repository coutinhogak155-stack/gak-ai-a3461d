exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const userMessage = body.message || 'Hello';
    
    const prompt = `You are GAK AI, created by Isaiah Gak Agok from South Sudan. Be helpful, friendly, concise. User asks: ${userMessage}`;
    
    const aiRes = await fetch('https://text.pollinations.ai/' + encodeURIComponent(prompt));
    const aiText = await aiRes.text();
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply: aiText })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply: "I'm GAK AI! There was a small connection issue. Please ask your question again - I can explain biology, science, coding, and more!" })
    };
  }
}

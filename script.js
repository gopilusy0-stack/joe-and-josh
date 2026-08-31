async function getAIRateEstimate(category, problemDetails) {
    const apiKey =AQ.Ab8RN6KBl56Qix3wQ864BJKYiSvH-4L5JdECQc4fUEn7KrHrgA
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const promptText = `
    You are an AI assistant for Joe and Josh, a computer repair service.
    Calculate an estimated service charge based ONLY on these strict pricing rules:

    --- PRICING RULES ---
    1. If difficulty is Easy: price = 25
    2. If difficulty is Medium: price = 75
    3. If difficulty is Hard: price = 100

    --- CUSTOMER DETAILS ---
    Category Selected: ${category}
    Customer Problem: ${problemDetails}

    Respond STRICTLY in this valid JSON format (no extra text or markdown):
    {
      "level": "Easy / Medium / Hard",
      "price": "25 / 75 / 100",
      "reason": "കാരണം മലയാളത്തിൽ ഒരു വരിയിൽ എഴുതുക"
    }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });

        const data = await response.json();
        let rawResult = data.candidates[0].content.parts[0].text.replace(/```json/g, "").replace(/```/g, "").trim();
        const aiData = JSON.parse(rawResult);

        alert(`Joe and Josh AI Estimate:\n\nService: ${category}\nLevel: ${aiData.level}\nEstimated Rate: ₹${aiData.price}\n\nReason: ${aiData.reason}`);

    } catch (error) {
        alert("AI കണക്റ്റ് ചെയ്യുന്നതിൽ ചെറിയൊരു പ്രശ്നം വന്നു. വീണ്ടും ശ്രമിക്കുക.");
    }
}

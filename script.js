async function getAIRateEstimate(category, problemDetails) {
    // 1. നിങ്ങളുടെ Gemini API Key ഇവിടെ നൽകുക
    const apiKey = 
AQ.Ab8RN6LcSG1l25DllidEX5aHjyK-H81VYhSdUCRXyXfac6DqGg
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const promptText = `
    You are an AI assistant for Fixora, a computer repair service.
    Calculate an estimated service charge based ONLY on our fixed pricing rules below.

    --- FIXORA PRICING RULES ---
    1. Software & Game Setup: ₹25 - ₹50
    2. PC & Laptop Troubleshooting: ₹50 - ₹75
    3. Virus & Security: ₹75 - ₹100
    4. Hardware Services: ₹100 - ₹500

    --- CUSTOMER DETAILS ---
    Category Selected: ${category}
    Customer Problem: ${problemDetails}

    Respond STRICTLY in this JSON format:
    {
      "level": "Easy / Medium / Hard",
      "price": "25,75,100,500
      
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

        alert(`Fixora AI Estimate:\n\nService: ${category}\nLevel: ${aiData.level}\nEstimated Rate: ₹${aiData.price}\n\nReason: ${aiData.reason}`);

    } catch (error) {
        alert("AI കണക്റ്റ് ചെയ്യുന്നതിൽ ചെറിയൊരു പ്രശ്നം വന്നു. API Key പരിശോധിക്കുക.");
    }
}


async function startAIChat() {
    // 1. Asking user to select service category in English
    const category = prompt("Please select your service category:\n1. Software & Game Setup\n2. PC & Laptop Troubleshooting\n3. Virus & Security\n4. Hardware Services");
    
    if (!category) return; // Stop process if user cancels

    // 2. Asking user to describe their issue in English
    const problemDetails = prompt("Please describe your computer issue clearly:");
    
    if (!problemDetails) return;

    // 3. Updated Gemini API Key
    const apiKey = "AQ.Ab8RN6IfrFC_OEDnkqcW7bdonREj8Vz64rU8lluRYSYoqkM5Fw"; 
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
      "reason": "Write a short reason in one sentence in ENGLISH."
    }
    `;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });

        const data = await response.json();
        
        if (data.error) {
            alert(`API Error: ${data.error.message}`);
            return;
        }

        let rawResult = data.candidates[0].content.parts[0].text.replace(/```json/g, "").replace(/```/g, "").trim();
        const aiData = JSON.parse(rawResult);

        // Showing output in full English
        alert(`Joe and Josh AI Estimate:\n\nCategory: ${category}\nLevel: ${aiData.level}\nEstimated Rate: ₹${aiData.price}\n\nReason: ${aiData.reason}`);

    } catch (error) {
        alert("Error: " + error.message);
    }
}

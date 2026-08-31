import { GoogleGenAI } from "@google/genai";




export const extractClaimData = async(story, fields) => {

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const fieldDescriptions = fields.map((field) => ({
        id: field.id,
        type: field.type,
        label: field.label,
        options: field.options || []

    }));

    const prompt = `
You are an AI assistant that extracts structured information
from an insurance claim description.

The user will provide a natural language description of an incident.

Your job is to extract only information that is explicitly present
in the user's description.

The available form fields are:

${JSON.stringify(fieldDescriptions, null, 2)}

User's description:

"${story}"

Today's date is ${new Date().toISOString().split("T")[0]}.

For date fields, always return the date in YYYY-MM-DD format.

If the user uses relative dates such as "today", "yesterday", or "two days ago", convert them to the corresponding actual date.

Return ONLY valid JSON.

The JSON keys must match the field IDs exactly.

If information for a field cannot be determined, do not include
that field in the response.

Do not invent information.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            temperature: 0,
            responseMimeType: "application/json"
        }
    });

    const content = response.text;

    return JSON.parse(content);

};


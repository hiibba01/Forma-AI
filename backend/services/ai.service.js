import { GoogleGenAI } from "@google/genai";


export const extractClaimData = async (story, fields) => {

    if (!story || !story.trim()) {
        return {};
    }

    if (!fields || !Array.isArray(fields) || fields.length === 0) {
        return {};
    }


    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });


    /*
     * Only send the information Gemini actually needs
     * about each field.
     */
    const fieldDescriptions = fields.map((field) => ({
        id: field.id,
        label: field.label,
        type: field.type,
        description: field.description || "",
        placeholder: field.placeholder || "",
        required: field.required || false,
        options: field.options || []
    }));


    const today = new Date().toISOString().split("T")[0];


    const prompt = `
You are an expert AI system for extracting structured data
from insurance claim descriptions.

Your task is to read the user's natural-language incident description
and extract values ONLY for the available form fields.

========================
IMPORTANT EXTRACTION RULES
========================

1. ONLY extract information that is explicitly stated or clearly implied
   by the user's description.

2. NEVER invent, guess, assume, or fabricate information.

3. If a value cannot be determined with reasonable confidence,
   DO NOT return that field.

4. Return JSON only.

5. JSON keys MUST exactly match the field IDs provided below.

6. NEVER create new field IDs.

7. NEVER return fields that are not present in the available form fields.

8. Preserve the meaning of the user's statement.
   Do not rewrite the user's information unnecessarily.

9. If the user provides additional information that does not correspond
   to any available field, ignore it.

10. If multiple pieces of information refer to the same field,
    choose the most specific and explicit value.

========================
FIELD TYPE RULES
========================

TEXT:
- Extract the relevant value directly from the description.
- Keep the value concise.
- Do not add information that was not provided.

TEXTAREA:
- Extract the relevant description from the user's statement.
- Preserve important details.
- Do not invent missing details.

SELECT:
- The returned value MUST correspond to one of the provided options.
- Match the user's wording to the closest available option ONLY when
  the meaning is clearly equivalent.
- If none of the options clearly match, DO NOT return the field.
- Prefer the option's "value" rather than its "label" when returning data.

CHECKBOX:
- Return true only when the user clearly indicates the condition is true.
- Return false only when the user clearly indicates the condition is false.
- Otherwise omit the field.

DATE:
- Always return dates in YYYY-MM-DD format.
- Convert relative dates using today's date.
- Today's date is ${today}.
- "today" means ${today}.
- "yesterday" means the day before today.
- "tomorrow" means the day after today.
- Convert phrases such as:
  "two days ago"
  "three days ago"
  "last Monday"
  "on 15 August"
  when the date can be determined confidently.
- If the exact date cannot be determined confidently, omit the field.
- NEVER invent a date.

========================
SYNONYM / MEANING MATCHING
========================

Understand natural language variations.

For example:

"car" → vehicle
"automobile" → vehicle
"my Honda Civic" → vehicle = Honda Civic

"hit a dog" → animal collision
"crashed into a deer" → animal collision

"windshield broke" → windshield damage
"front glass shattered" → windshield damage

However, semantic matching must NEVER override the actual
meaning of the user's statement.

========================
CONFLICT HANDLING
========================

If the description contains conflicting information:

- Prefer the most recent explicit statement.
- Do not attempt to resolve contradictions using assumptions.
- If the conflict cannot be resolved confidently, omit the field.

========================
AVAILABLE FORM FIELDS
========================

${JSON.stringify(fieldDescriptions, null, 2)}

========================
USER DESCRIPTION
========================

"${story}"

========================
FINAL REQUIREMENTS
========================

Return ONLY a valid JSON object.

Do not include:
- markdown
- code fences
- explanations
- comments
- additional text

Only return fields for which you have sufficient evidence.

Example:

{
    "incidentType": "animal_collision",
    "vehicle": "Honda Civic",
    "damage": "windshield shattered",
    "incidentDate": "2026-09-22"
}
`;


    try {

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,

            config: {
                temperature: 0,
                responseMimeType: "application/json"
            }
        });


        const content = response.text?.trim();

        if (!content) {
            return {};
        }


        let extractedData;

        try {

            extractedData = JSON.parse(content);

        } catch (parseError) {

            console.error(
                "Gemini returned invalid JSON:",
                content
            );

            return {};
        }


        /*
         * Safety layer:
         * Only allow keys that actually exist
         * in the form definition.
         */
        const validFieldIds = new Set(
            fields.map((field) => field.id)
        );


        const cleanedData = {};


        for (const [key, value] of Object.entries(extractedData)) {

            if (!validFieldIds.has(key)) {
                continue;
            }


            /*
             * Ignore empty values.
             */
            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {
                continue;
            }


            const field = fields.find(
                (item) => item.id === key
            );


            if (!field) {
                continue;
            }


            /*
             * Validate select fields.
             */
            if (field.type === "select") {

                const validValues = (field.options || []).map(
                    (option) => option.value
                );

                if (!validValues.includes(value)) {
                    console.warn(
                        `Ignoring invalid value for ${key}:`,
                        value
                    );

                    continue;
                }
            }


            /*
             * Validate checkbox fields.
             */
            if (field.type === "checkbox") {

                if (typeof value !== "boolean") {
                    continue;
                }
            }


            /*
             * Validate date fields.
             */
            if (field.type === "date") {

                const isValidDate =
                    /^\d{4}-\d{2}-\d{2}$/.test(value);

                if (!isValidDate) {
                    continue;
                }
            }


            cleanedData[key] = value;
        }


        return cleanedData;

    } catch (error) {

        console.error(
            "AI claim extraction error:",
            error
        );

        return {};
    }
};
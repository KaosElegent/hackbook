const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI_KEY);

function buildPrompt(message:string){
    const prompt = `I'm about to give you a user written string, can you remove any obscenities from it (it should not have anything inappropritate or insulting). Return an empty string is nothing is appropriate, otherwise end the changed sentences with a fullstop.
    Here's the string:
    ${message}`;
    return prompt
}

export async function getResponse(message:string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = buildPrompt(message);
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

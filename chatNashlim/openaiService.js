require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const openaiService = {
    async checkFact(text) {
        console.log(`Sending request to OpenAI API with text: ${text}`);
   
        try {
            const response = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `Fact-check this statement: "${text}"` }
                ],
                model: "gpt-4-turbo",
            });
    
            const responseContent = response.choices[0].message.content;
            console.log(`Received response from OpenAI API: ${responseContent}`);

            // Check if the response contains keywords indicating uncertainty, lack of knowledge, or incorrectness.
            const uncertaintyKeywords = ['not sure', 'uncertain', 'don\'t know', 'unable to verify', 'cannot confirm', 'incorrect', 'false', 'לא בטוח', 'לא יודע', 'אינני יכול לאמת', 'אינני יכול לאשר', 'לא נכון', 'שגוי'];
            const isUncertain = uncertaintyKeywords.some(keyword => responseContent.toLowerCase().includes(keyword));

            if (isUncertain) {
                console.log('The fact could not be verified or is incorrect. Please check from a reliable source.');
            }

            return responseContent;
        } catch (error) {
            console.error(`Error in OpenAI Service: ${error}`);
            throw error;
        }
    }
};

module.exports = openaiService;
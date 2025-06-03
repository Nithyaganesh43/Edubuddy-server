require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { OpenAI } = require('openai');
const serverRouter = require('./util/Server');
const fs = require('fs');
const path = require('path');
const { 
  generateQuestionsPrompt,
  getrecommendationsPrompt,
} = require('./util/utilities');

const {static_data,streams_exam_info} = require('./util/static');

const doc = fs.readFileSync(path.join(__dirname, 'util', 'doc.html'), 'utf8');

const openai = new OpenAI({ apiKey: process.env.API_KEY });
const app = express();

let [question,recommendation,chat]=[0,0,0]; 
app.use(cookieParser());
app.use(express.json());
app.use(serverRouter);

const auth = (req,res,next)=>{
   if (req.body.PASSWORD === 'Swetha@2005') {
     return next();
   }
   res.status(403).json({ error: 'Invalid Password'});
}

app.post('/check',auth, (req, res) => { 
    return res.send('ok'); 
});


app.post('/fakeGenerateQuestions',auth, async (req, res) => {
  try {
    const promptText = generateQuestionsPrompt(req.body.userData);
    question++;
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: promptText }],
    });

    let content = response.choices?.[0]?.message?.content?.trim();
    const jsonData = content ? JSON.parse(content) : {};

    res.json(jsonData);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});


app.post(
  '/fakeGetRecommendations',auth,
  async (req, res) => {
    try {
      const promptText = getrecommendationsPrompt(
        req.body.userData,
        req.body.SurveyResult
      );
      recommendation++;
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'system', content: promptText }],
      });
      res.send(response.choices?.[0]?.message?.content || '');
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);
 app.post('/chat', async (req, res) => {
   try {
     const { userMessage } = req.body;
     if (!userMessage?.trim())
      return res.status(400).json({ error: 'userMessage is required' });
    
    chat++;
     const response = await openai.chat.completions.create({
       model: 'gpt-3.5-turbo',
       messages: [
         {
           role: 'system',
           content:
             'You are an AI assistant helping students choose the right courses and colleges, mainly in Tamil Nadu and India. Provide clear, kind, and concise responses. respond in para under 100 chars',
         },
         { role: 'user', content: userMessage },
       ],
       temperature: 0.7,
       max_tokens: 150,
     });

     const aiReply =
       response.choices?.[0]?.message?.content?.trim() ||
       'I am unable to process your request at the moment.';
     res.json({ response: aiReply });
   } catch (error) {
     res
       .status(500)
       .json({ error: 'Failed to generate response', details: error.message });
   }
 });

app.get('/monitor', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Monitor</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">API REQUEST</h2>
            <div class="space-y-3">
                <p><span class="font-medium text-gray-700">Chat:</span> <span class="text-gray-600">${chat}</span></p>
                <p><span class="font-medium text-gray-700">Question:</span> <span class="text-gray-600">${question}</span></p>
                <p><span class="font-medium text-gray-700">Recommendation:</span> <span class="text-gray-600">${recommendation}</span></p>
                <p><span class="font-medium text-gray-700">TOTAL:</span> <span class="text-gray-600">${recommendation+question+chat}</span></p>
            </div>
        </div>
    </body>
    </html>
  `);
}); 
app.get('/static_data', (req, res) => {
  res.json(static_data);
});
app.get('/streams_exam_info', (req, res) => {
  res.json(streams_exam_info);
});

app.use((req, res) => res.send(doc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

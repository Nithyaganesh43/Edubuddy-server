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
 const checkAccess = (req, res, next) => {
   if (req.body.PASSWORD === "Swetha@2005") next();
   else res.status(403).json({ error: 'Access Denied' });
 };


const doc = fs.readFileSync(path.join(__dirname, 'util', 'doc.html'), 'utf8');

const openai = new OpenAI({ apiKey: process.env.API_KEY });
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(serverRouter);

app.post('/check', (req, res) => {
 if (req.body.PASSWORD === 'Swetha@2005') {
   return res.send('ok');
 }
  res.status(403).json({ error: 'Invalid Password' });
});


app.post('/fakeGenerateQuestions',checkAccess, async (req, res) => {
  try {
    const promptText = generateQuestionsPrompt(req.body.userData);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: promptText }],
    });

    let content = response.choices?.[0]?.message?.content?.trim();
    const jsonData = content ? JSON.parse(content) : {};

    res.json(jsonData);
  } catch (e){
    res.status(500).json({ error: e.message});
  }
});


app.post(
  '/fakeGetRecommendations',checkAccess,
  async (req, res) => {
    try {
      const promptText = getrecommendationsPrompt(
        req.body.userData,
        req.body.SurveyResult
      );
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: promptText }],
      });
      res.send(response.choices?.[0]?.message?.content || '');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
 
app.post('/chat', async (req, res) => {
  try {
    const { userMessage } = req.body;
    if (!userMessage?.trim())
      return res.status(400).json({ error: 'userMessage is required' });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI assistant helping students choose the right courses and colleges, mainly in Tamil Nadu and India. Provide clear, kind, and concise responses.',
        },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 200,
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


app.use((req, res) => res.send(doc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

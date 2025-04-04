require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { OpenAI } = require('openai');
const serverRouter = require('./util/Server');

const fs = require('fs');
const path = require('path');
const {
  fackQuestions,
  generateQuestionsPrompt,
  getrecommendationsPrompt,
} = require('./util/utilities');
const {
  validatePassword,
  validateUserData,
  validateRecommendationBody,
} = require('./util/validation');


const doc = fs.readFileSync(path.join(__dirname, 'util', 'doc.html'), 'utf8');

const openai = new OpenAI({ apiKey: process.env.API_KEY });
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(serverRouter);

app.post('/check', (req, res) => {
  if (req.body.PASSWORD === process.env.PASSWORD) {
    return res.send('ok');
  }
  res.status(403).json({ error: 'Invalid Password' });
});

app.post(
  '/generateQuestions',
  validatePassword,
  validateUserData,
  async (req, res) => {
    try {
      const promptText = generateQuestionsPrompt(req.body.userData);
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: promptText }],
      });
      res.json(JSON.parse(response.choices?.[0]?.message?.content || '{}'));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post(
  '/getrecommendations',
  validatePassword,
  validateRecommendationBody,
  async (req, res) => {
    try {
      const promptText = getrecommendationsPrompt(
        req.body.userData,
        req.body.SurveyResult
      );
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: promptText }],
        max_tokens: 50,
      });
      res.send(response.choices?.[0]?.message?.content || '');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post(
  '/fakeGenerateQuestions',
  validatePassword,
  validateUserData,
  async (req, res) => {
    setTimeout(() => {
      res.json(fackQuestions);
    }, 2000);
  }
);

app.post(
  '/fakeGetRecommendations',
  validatePassword,
  validateRecommendationBody,
  async (req, res) => {
    setTimeout(() => {
      res.json({
        recommendation: {
          course: 'AIML',
          college: req.body.userData.interested_colleges[0] || 'SECE',
          reason: 'Better AI scope',
        },
      });
    }, 2000);
  }
);

app.use((req, res) => res.send(doc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { OpenAI } = require('openai');
const Server = require('./util/Server');
const fs = require('fs');
const path = require('path');
const {
  fackQuestions,
  generateQuestionsPrompt,
  getrecommendationsPrompt,
} = require('./util/utilities');
const doc = fs.readFileSync(path.join(__dirname, 'util', 'doc.html'), 'utf8');

const openai = new OpenAI({ apiKey: process.env.API_KEY });
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(Server);

app.post('/generateQuestions', async (req, res) => {
  const { userData } = req.body;
  if (!userData) return res.status(400).json({ error: 'Invalid request' });

  const {
    name,
    location,
    cutoff,
    'CBSC/BOARD': board,
    'HR.Sec.Course': hrCourse,
    favor_districts,
    interested_colleges,
    query,
  } = userData;

  if (!name || !location || !cutoff || !board || !hrCourse || !query) {
    return res.status(400).json({ error: 'Invalid userData format' });
  }

  const promptText = generateQuestionsPrompt(
    name,
    location,
    cutoff,
    board,
    hrCourse,
    favor_districts,
    interested_colleges,
    query
  );

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: promptText }],
  });

  try {
    const questions = JSON.parse(
      response.choices?.[0]?.message?.content || '{}'
    );
    res.json(questions);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to generate valid questions' });
  }
});
app.post('/getrecommendations', async (req, res) => {
  try {
    const { userData, SurveyResult } = req.body;
    if (!userData || !SurveyResult) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    //prompt must not be modified
    const promptText = getrecommendationsPrompt(userData, SurveyResult);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: promptText }],
      max_tokens: 50,
    });

    const rawContent = response.choices?.[0]?.message?.content;

    if (!rawContent) {
      return res
        .status(500)
        .json({ error: 'OpenAI returned an empty response' });
    }

    res.send(rawContent);
  } catch (error) {
    console.error('Server Error:', error);
    res
      .status(500)
      .json({ error: 'Failed to generate a valid recommendation' });
  }
});

//fackRoutes for development
app.post('/fakeGenerateQuestions', async (req, res) => {
  const { userData } = req.body;
  if (!userData) return res.status(400).json({ error: 'Invalid request' });

  const {
    name,
    location,
    cutoff,
    'CBSC/BOARD': board,
    'HR.Sec.Course': hrCourse,
    favor_districts,
    interested_colleges,
    query,
  } = userData;

  if (
    !name ||
    !location ||
    !cutoff ||
    !board ||
    !hrCourse ||
    !Array.isArray(favor_districts) ||
    !Array.isArray(interested_colleges) ||
    !query
  ) {
    return res.status(400).json({ error: 'Invalid userData format' });
  }

  setTimeout(() => {
    res.json(fackQuestions);
  }, 2000);
});

app.post('/fakeGetRecommendations', async (req, res) => {
  const { userData, SurveyResult } = req.body;

  if (
    !userData ||
    !SurveyResult ||
    !userData.name ||
    !userData.location ||
    !userData.cutoff ||
    !userData['CBSC/BOARD'] ||
    !userData['HR.Sec.Course'] ||
    !userData.query
  ) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  setTimeout(() => {
    res.json({
      recommendation: {
        course: 'AIML',
        college: userData.interested_colleges[0] || 'SECE',
        reason: 'Better AI scope',
      },
    });
  }, 2000);
});

app.use((req, res) => res.send(doc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

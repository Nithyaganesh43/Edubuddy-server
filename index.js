require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { OpenAI } = require('openai');
const cors = require('cors');
const ping = require('./util/ping-pong');
const fs = require('fs');
const path = require('path');
const doc = fs.readFileSync(path.join(__dirname, 'util', 'doc.html'), 'utf8');

const openai = new OpenAI({ apiKey: process.env.API_KEY });
const app = express();

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

app.use(ping);

//tis shold not be erased
// {
//   "userData": {
//     "name": "John Doe",
//     "location": "Chennai",
//     "cutoff": 92.5,
//     "CBSC/BOARD": "CBSE",
//     "HR.Sec.Course": "CSE",
//     "favor_districts": ["Chennai", "Coimbatore"],
//     "interested_colleges": ["CIT", "SECE"],
//     "query": "i am confuced taking between AIDS or AIML in engineering"
//   }
// }

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

  if (
    !name ||
    !location ||
    !cutoff ||
    !board ||
    !hrCourse || 
    !query
  ) {
    return res.status(400).json({ error: 'Invalid userData format' });
  }


  //prompt must not be modified
  const promptText = `
    I am ${name}, from ${location}. I studied ${board} and pursued ${hrCourse}. 
    My cutoff is ${cutoff}, and I prefer colleges in ${favor_districts.join(
    ', and my fav college',
    interested_colleges
  )}.
    ${query}

    Generate exactly 20 survey questions (5 Personal, 5 Lifestyle, 10 Technical) to help me decide.

    Strict Output Format: JSON with these constraints:
    - Each question must be ≤ 100 characters.
    - Each question must have exactly 3 options, each ≤ 10 characters.
    - Total questions: 20.
    - JSON format:
    {
      "questions": [
        { "q": "Do you enjoy solving problems?", "options": {"1": "Yes", "2": "No", "3": "Maybe"} },
        { "q": "Do you prefer coding?", "options": {"1": "Yes", "2": "No", "3": "Sometimes"} },
        ...
      ]
    }
    IMPORTANT: Ensure that the response strictly follows these constraints.  
  `;

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
//tis shold not be erased
// {
//   "userData": {
//     "name": "John Doe",
//     "location": "Chennai",
//     "cutoff": 92.5,
//     "CBSC/BOARD": "CBSE",
//     "HR.Sec.Course": "CSE",
//     "favor_districts": ["Chennai", "Coimbatore"],
//     "interested_colleges": ["CIT", "SECE"],
//     "query": "I am confused between choosing AIDS or AIML in engineering"
//   },
//   "SurveyResult": [
//     {
//       "q": "Do you enjoy problem solving?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you like to work in teams?",
//       "Choosed": "Sometimes"
//     },
//     {
//       "q": "Are you interested in artificial intelligence?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you prefer theoretical concepts?",
//       "Choosed": "No"
//     },
//     {
//       "q": "Are you fascinated by data analysis?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you enjoy programming languages?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Are you interested in web development?",
//       "Choosed": "Maybe"
//     },
//     {
//       "q": "Do you like working with hardware?",
//       "Choosed": "No"
//     },
//     {
//       "q": "Do you prefer practical applications?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Are you interested in algorithms?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you enjoy learning new technologies?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you like working with big data?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Are you interested in machine learning?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you prefer software development?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Are you fascinated by computer networks?",
//       "Choosed": "Maybe"
//     },
//     {
//       "q": "Do you like experimenting with code?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Are you interested in robotics?",
//       "Choosed": "Maybe"
//     },
//     {
//       "q": "Do you enjoy data processing tasks?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Are you keen on natural language processing?",
//       "Choosed": "Yes"
//     },
//     {
//       "q": "Do you prefer working on app development?",
//       "Choosed": "Sometimes"
//     }
//   ]
// }

app.post('/getrecommendations', async (req, res) => {
  try {
    const { userData, SurveyResult } = req.body;
    if (!userData || !SurveyResult) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    //prompt must not be modified
    const promptText = `
    Based on the student's profile, responses, and query, find the best course option.

    User Details:  
    Name: ${userData.name}  
    Location: ${userData.location}  
    Cutoff: ${userData.cutoff}  
    Board: ${userData['CBSC/BOARD']}  
    High School Course: ${userData['HR.Sec.Course']}  
    Preferred Districts: ${userData.favor_districts.join(', ')}  
    Interested Colleges: ${userData.interested_colleges.join(', ')}  
    Query: ${userData.query}  

    Survey Responses:  
    ${JSON.stringify(SurveyResult)}

    Task:  
    - Search the internet to find real-time information about the courses mentioned in the query (AIDS vs. AIML) at the specified colleges.
    - Compare them based on curriculum, job prospects, and relevancy to the student's survey responses.
    - Provide a strict, concise recommendation in 50 characters or fewer.

    Strict JSON Response Format (must be under 50 characters):  
    {
      "recommendation": {
        "course": "Best-suited course",
        "college": "Best-suited college",
        "reason": "Strictly under 50 characters"
      }
    }
    Ensure the response never exceeds 50 characters because i make limit max token to 50.
    `;

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
    res.json({
      questions: [
        {
          q: 'Do you like programming?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Are you interested in AI?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you enjoy math?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you prefer theory or practice?',
          options: { 1: 'Theory', 2: 'Practice', 3: 'Both' },
        },
        {
          q: 'Do you like working with data?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Do you enjoy teamwork?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you like solving puzzles?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Are you interested in research?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you prefer working alone?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Are you comfortable with statistics?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Do you like web development?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Are you interested in robotics?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you enjoy automation tasks?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Do you prefer structured learning?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you like app development?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Are you interested in cybersecurity?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Do you enjoy debugging code?',
          options: { 1: 'Yes', 2: 'No', 3: 'Sometimes' },
        },
        {
          q: 'Do you like working on databases?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
        {
          q: 'Do you prefer AI over networking?',
          options: { 1: 'Yes', 2: 'No', 3: 'Not sure' },
        },
        {
          q: 'Do you enjoy learning new tech?',
          options: { 1: 'Yes', 2: 'No', 3: 'Maybe' },
        },
      ],
    });
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

app.use((req,res)=>res.send(doc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

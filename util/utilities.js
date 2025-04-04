const fackQuestions = {
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
};

const generateQuestionsPrompt = (userData) => {
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

  return `
    I am ${name}, from ${location}. I studied ${board} and pursued ${hrCourse}. 
    My cutoff is ${cutoff}, and I prefer colleges in ${favor_districts.join(
    ', '
  )}.
    My favorite colleges are: ${interested_colleges.join(', ')}.
    ${query}

    Generate exactly 20 survey questions (5 Personal, 5 Lifestyle, 10 Technical) to help me decide.

    Strict Output Format: JSON with these constraints:
    - Each question must be specific to my details and relevant to my query.
    - Each question must have exactly 3 options, each ≤ 10 characters.
    - Total questions: 20.
    - JSON format:
    {
      "questions": [
        { "q": "Do you enjoy solving problems?", "options": { "1": "Yes", "2": "No", "3": "Maybe" } },
        { "q": "Do you prefer coding?", "options": { "1": "Yes", "2": "No", "3": "Sometimes" } }
      ]
    }
    IMPORTANT: Ensure that the response strictly follows these constraints.
  `;
};
  const getrecommendationsPrompt = (userData, SurveyResult) =>{ return `
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
    - Search the internet to find real-time information about the courses mentioned in the query at the specified colleges.
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
};

module.exports = {
  generateQuestionsPrompt,
  getrecommendationsPrompt,
  fackQuestions,
};

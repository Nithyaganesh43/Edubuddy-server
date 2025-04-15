### Backend Design Document for Student Course Recommendation System 

### Overview
This backend serves as the core logic for a college project, providing AI-powered course recommendations based on user responses to dynamically generated survey questions. The system is built using Express.js and integrates OpenAI for question generation and course recommendations.

### System Architecture
- *Technology Stack:* Node.js, Express.js, OpenAI API
- *Target Usage:* Single-client system (one frontend application)
- *Endpoints:* Two primary routes for handling requests

### API Endpoints
#### 1. Generate Questions
- *Endpoint:* POST /generateQuestions
- *Request Body:*
  json
  {
    "userData": {
      "name": "Nithya Ganesh",
      "education": "Completed schooling in Akshya Academy Metric Hr Sec School",
      "cutoff": 193.5,
      "board": "State Board",
      "higherSecondary": "Computer Science",
      "interests": "AI and software development",
      "query": "I have confusion taking either SECE or CIT and AIML or AIDS"
    }
  }
  
  Note: The backend should format the paragraph data from the frontend form submission into structured JSON before processing.

- *Response:* JSON containing 20 survey questions with multiple-choice options.
  json
  {
    "questions": [
      { "q": "Do you enjoy solving logical problems?", "options": {"1": "Yes", "2": "No", "3": "Not Sure"} },
      { "q": "Would you prefer working with AI models?", "options": {"1": "Yes", "2": "No", "3": "Not Sure"} }
    ]
  }
  
  Note: The questions follow the 5-5-10 rule (5 personal interest, 5 lifestyle, 10 technical questions).

#### 2. Get Recommendations
- *Endpoint:* POST /getrecommendations
- *Request Body:*
  json
  {
    "userData": {
      "name": "Nithya Ganesh",
      "education": "Completed schooling in Akshya Academy Metric Hr Sec School",
      "cutoff": 193.5,
      "board": "State Board",
      "higherSecondary": "Computer Science",
      "interests": "AI and software development",
      "query": "I have confusion taking either SECE or CIT and AIML or AIDS"
    },
    "responses": {
      "q1": { "question": "Do you enjoy solving logical problems?", "answer": "Yes" },
      "q2": { "question": "Would you prefer working with AI models?", "answer": "No" }
    }
  }
  
- *Response:* JSON with ranked course recommendations and justifications.
  json
  {
    "recommendations": [
      {
        "course": "B.Tech Artificial Intelligence",
        "college": "IIT Madras",
        "rank": "Best Preference",
        "justification": "Based on your strong inclination towards AI development."
      },
      {
        "course": "BE Computer Science",
        "college": "NIT Trichy",
        "rank": "Second Preference",
        "justification": "You have a balanced interest in software engineering and general computing fields."
      },
      {
        "course": "B.Tech Information Technology",
        "college": "Anna University",
        "rank": "Third Preference",
        "justification": "Your survey suggests a moderate interest in IT and software solutions."
      },
      {
        "course": "B.Tech Cybersecurity",
        "college": "VIT University",
        "rank": "Fourth Preference",
        "justification": "Your responses indicate a potential interest in cybersecurity and ethical hacking."
      }
    ]
  }
  

### Key Features
- *AI-Generated Questions:* Dynamic questions tailored to the user’s background.
- *Personalized Recommendations:* Based on user responses and AI analysis.
- *Standardized Input & Output:* Ensures consistent API communication.

### Limitations
- Serves only one client.
- Requires OpenAI API key for operation.

### Security Considerations
- Ensure API key security by using environment variables.
- Validate user input to prevent malformed requests.
- Handle API request failures gracefully.

### Conclusion
This backend efficiently generates personalized course recommendations by integrating AI, ensuring an interactive and intelligent decision-making process for students.


 const generateQuestionsPrompt = (userData) => {
  
   return `
You are an expert education and career guidance assistant.

Use the student's personal data and query below to generate a customized survey. The goal is to help the student make the right decision regarding their course and college.

 User Details:  
    Name: ${userData.name} 
    Location: ${userData.location}   
    Previous Course info: ${userData.previousCourse}  
    Preferred Locations: ${
      userData.favorLocations
        ? userData.favorLocations.split(',').join(', ')
        : 'N/A'
    }  
    Interested Colleges: ${
      userData.interestedColleges
        ? userData.interestedColleges.split(',').join(', ')
        : 'N/A'
    } 
    Interested Course: ${
      userData.interestedCourse
        ? userData.interestedCourse.split(',').join(', ')
        : 'N/A'
    }  
    Query: ${userData.userQuery}  

IMPORTANT: The query is the most critical input. Analyze it deeply. Every question in the survey must help the student clarify and reflect on this query.
mention student's name ,  Interested Course/Colleges/Locations in some questions.
Survey Generation Instructions:
- Generate exactly **20** multiple-choice questions:
  - 5 Personal
  - 5 Lifestyle
  - 10 Subject/Career-related
- Each question must be:
  - **Custom to this student's profile and query**
  - No more than **20 words**
  - Easy to understand (for both 12th-grade and college students)
  - Free of stream-specific terms (e.g., avoid "engineering", "arts", "medical", etc.)
  - Meaningful — do **not** include vague or generic questions
  - Helpful in guiding a real decision (no filler or overlap)

Options Format:
- Each question must include exactly **3 options**
- Each option must be **≤10 characters**
- Avoid neutral or middle-ground options that apply to all streams
- Make sure options force a choice that reveals student preference

**Output Format (JSON):**
{
  "questions": [
    {
      "q": "Do you want to build apps like Amazon in the future?",
      "options": { "1": "Yes", "2": "No", "3": "Maybe" }
    },
    {
      "q": "Do you enjoy designing visuals or solving logic problems?",
      "options": { "1": "Design", "2": "Logic", "3": "Unsure" }
    }
  ]
}

**Final Notes:**
- This is a general-purpose platform — not restricted to any academic stream or level.
- Avoid questions like “Do you want to study law?” — instead, create questions that **indirectly explore** the student’s thinking.
- Every question must be **creative, specific, and actionable** — designed to drive clarity, not confusion.
- Absolutely **no generic, vague, or “both could apply”** style questions (e.g., “Are you interested in human behavior?”).
- if they gave intersted college and have confussion in it pls dont ask directly like this Would you rather study at SECE or PSG? 
`;
 };

  const getrecommendationsPrompt = (userData, SurveyResult) =>{ return `
    Based on the student's profile, responses, and query, find the best course option.

    User Details:  
    Name: ${userData.name} 
    Location: ${userData.location}     
    Previous Course info: ${userData.previousCourse}  
    Preferred Locations: ${
      userData.favorLocations
        ? userData.favorLocations.split(',').join(', ')
        : 'N/A'
    }  
    Interested Colleges: ${
      userData.interestedColleges
        ? userData.interestedColleges.split(',').join(', ')
        : 'N/A'
    } 
    Interested Course: ${
      userData.interestedCourse
        ? userData.interestedCourse.split(',').join(', ')
        : 'N/A'
    }  
    Query: ${userData.userQuery}  

    Survey Responses:  
    ${JSON.stringify(SurveyResult, null, 2)} 

    Task:  
    - Search the internet to find real-time information about the courses mentioned in the query at the specified colleges.
    - Compare them based on curriculum, job prospects, and relevancy to the student's survey responses.
    - Provide a strict, concise recommendation.
    - give in full form not like this "CSE" 
    Strict JSON Response Format (must be under 150 characters):  
    {
      "recommendation": {
        "course": "Best-suited course",
        "college": "Best-suited college",
        "reason": "Strictly under 200 characters reason should be personaly for this student"
      }
    } 
    `;
};

module.exports = {
  generateQuestionsPrompt,
  getrecommendationsPrompt 
};

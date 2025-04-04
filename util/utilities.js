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
    I am ${name} from ${location}. I studied under the ${board} board and took ${hrCourse} in my previous course.  
    My cutoff score is ${cutoff}, and I prefer colleges in ${favor_districts.join(
     ', '
   )}.  
    Some colleges I am interested in: ${interested_colleges.join(', ')}.  

    ${query}

    Please create 20 thoughtful survey questions to help me choose the right course and college.  
    - 5 Personal questions  
    - 5 Lifestyle questions  
    - 10 Subject-related questions  

    **Strict Rules for Questions:**  
    - The questions should match my background and help me think about my future.  
    - The questions should be easy to understand for students from different education levels.  
    - Do not use specific terms like "engineering," "arts," or "medical" directly—ask in a way that any student can relate to.  
    - Each question should have exactly 3 answer options, with each option being 10 characters or fewer.  
    - The total number of questions must be exactly 20.  

    **Output Format (JSON):**  
    {
      "questions": [
        { "q": "Do you like solving problems?", "options": { "1": "Yes", "2": "No", "3": "Sometimes" } },
        { "q": "Have you worked in ITO project before?", "options": { "1": "Yes", "2": "No", "3": "Not sure" } }
      ]
    }

    **IMPORTANT:**  
    - The survey is for students in Tamil Nadu, India, from different education levels (12th-pass and college students).  
    - Questions should not be too direct, like "Do you want to study law?" Instead, ask in a way that helps the student think.  
    - The questions should be creative and personalized, making it easier for the student to explore their interests.  
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
    - Provide a strict, concise recommendation in 150 characters or fewer.

    Strict JSON Response Format (must be under 150 characters):  
    {
      "recommendation": {
        "course": "Best-suited course",
        "college": "Best-suited college",
        "reason": "Strictly under 100 characters reason should be personaly for this student"
      }
    } 
    `;
};

module.exports = {
  generateQuestionsPrompt,
  getrecommendationsPrompt 
};

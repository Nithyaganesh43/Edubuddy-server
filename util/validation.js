const sanitize = (str) => (typeof str === 'string' ? str.trim() : str);

const userDataValidator = (userData) => {
  if (!userData || typeof userData !== 'object')
    throw new Error('Invalid user data');

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

  if (!name) throw new Error('Name is required');
  if (name.length > 100) throw new Error('Name must not exceed 100 characters');

  if (!location) throw new Error('Location is required');
  if (location.length > 100)
    throw new Error('Location must not exceed 100 characters');

  if (!cutoff) throw new Error('Cutoff is required');
  if (cutoff.length > 10)
    throw new Error('Cutoff must not exceed 10 characters');

  if (!board) throw new Error('Board is required');
  if (board.length > 10) throw new Error('Board must not exceed 50 characters');

  if (!hrCourse) throw new Error('Higher Secondary Course is required');
  if (hrCourse.length > 50)
    throw new Error('Higher Secondary Course must not exceed 50 characters');

  if (!query) throw new Error('Query is required');
  if (query.length > 100)
    throw new Error('Query must not exceed 200 characters');

  if (!Array.isArray(favor_districts))
    throw new Error('Favor districts must be an array');
  if (!Array.isArray(interested_colleges))
    throw new Error('Interested colleges must be an array'); 
 
};

const recommendationBodyValidator = (userData, SurveyResult) => {
  if (!SurveyResult) throw new Error('SurveyResult is required');

  return userDataValidator(userData);
};

const validatePassword = (req, res, next) => {
  if (!req.body.PASSWORD || req.body.PASSWORD !== process.env.PASSWORD) {
    return res.status(403).json({ error: 'Invalid Password' });
  }
  next();
};

const validateUserData = (req, res, next) => {
  try {
    if (!req.body.userData) {
      throw new Error('Missing userData');
    }
    userDataValidator(req.body.userData);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const validateRecommendationBody = (req, res, next) => {
  try {
    if (!req.body.userData || !req.body.SurveyResult) {
      throw new Error('Missing userData or SurveyResult');
    }
    recommendationBodyValidator(req.body.userData, req.body.SurveyResult);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {validatePassword, validateUserData, validateRecommendationBody };

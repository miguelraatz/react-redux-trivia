export const USER_PROFILE = 'USER_PROFILE';
export const SAVE_INFO = 'SAVE_INFO';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const user = (payload) => ({
  type: USER_PROFILE,
  payload,
});

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const actionFetchQuestionsApi = (token) => async (dispatch) => {
  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await fetchApi.json();
  dispatch(saveQuestions(response));
  return response;
};

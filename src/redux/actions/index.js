export const USER_PROFILE = 'USER_PROFILE';
export const SAVE_INFO = 'SAVE_INFO';

export const user = (payload) => ({
  type: USER_PROFILE,
  payload,
});

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

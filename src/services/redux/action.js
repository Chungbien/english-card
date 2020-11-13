export const callApiGetData = data => {
  return {
      type: 'GET',
      payload: data,
  };
};
export const callApiSet = data => {
  return {
      type: 'SET',
      payload: data,
  };
};
export const callApiSubmit = data => {
  return {
      type: 'SUBMIT',
      payload: data,
  };
};
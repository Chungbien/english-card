const initialState = {
  count: 0,
  initialMessage: 'Chung Bien'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET':
      return {
        ...initialState,
        initialMessage: null
      }
    case 'SET':
      return {
        ...initialState,
        initialMessage: 'set'
      }
    case 'SUBMIT':
      return {
        ...initialState,
        initialMessage: 'sumit'
      }
    default:
      return state;
  }
}

export default reducer;
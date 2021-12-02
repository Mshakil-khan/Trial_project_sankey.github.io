export const TEST_SELECTED = "TEST_SELECTED";

const selectTest = (testData) => {
  return {
    type: TEST_SELECTED,
    testData,
  };
};



export const selectedTest = (data) => (dispatch) => {
  dispatch(selectTest(data));
};



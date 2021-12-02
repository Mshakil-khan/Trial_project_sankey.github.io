import { TEST_SELECTED } from "../action/selectActions";

const initialState = {
  selectedTestData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_SELECTED:
      return {
        ...state,
        selectedTestData: action.testData,
      };

    default:
      return state;
  }
}

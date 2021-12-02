import {
  FETCH_TEST_REQUEST,
  FETCH_TEST_SUCCESS,
  FETCH_TEACHER_TEST_REQUEST,
  FETCH_TEACHER_TEST_SUCCESS,
  FETCH_TEACHER_TEST_FAILURE,
} from "../action/testActions";

const initialState = {
  isFetching: false,
  isLoadingTest: false,
  isLoadingAttemptedTest: false,
  fetchingError: false,
  isFetched: false,
  testSubmitted: false,
  testSubmitError: false,
  test: [],
  attemptedTest: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TEST_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        isLoadingAttemptedTest: true,
        fetchingError: false,
      };
    case FETCH_TEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoadingTest: false,
        isFetched: true,
        test: action.tests,
      };
    case FETCH_TEACHER_TEST_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        isLoadingAttemptedTest: true,
        fetchingError: false,
      };

    case FETCH_TEACHER_TEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoadingTest: false,
        isFetched: true,
        test: action.tests,
      };

    case FETCH_TEACHER_TEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isLoadingTest: false,
        isLoadingAttemptedTest: false,
        fetchError: true,
      };

    default:
      return state;
  }
}

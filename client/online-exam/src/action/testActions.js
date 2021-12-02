import axios from "axios";

export const FETCH_TEST_REQUEST = "FETCH_TEST_REQUEST";
export const FETCH_TEST_SUCCESS = "FETCH_TEST_SUCCESS";

// Teacher action types
export const FETCH_TEACHER_TEST_REQUEST = "FETCH_TEACHER_TEST_REQUEST";
export const FETCH_TEACHER_TEST_SUCCESS = "FETCH_TEACHER_TEST_SUCCESS";
export const FETCH_TEACHER_TEST_FAILURE = "FETCH_TEACHER_TEST_FAILURE";
const url = "http://localhost:5000"

const requestTests = () => {
  return {
    type: FETCH_TEST_REQUEST,
  };
};

const receiveTests = (tests) => {
  return {
    type: FETCH_TEST_SUCCESS,
    tests,
  };
};


export const fetchTests = (className) => async (dispatch) => {
  dispatch(requestTests());

  try {
    const result = await axios.get(`${url}/student/tests/${className}`);
    if (result.data) {
      dispatch(receiveTests(result.data.obj));

    }

  } catch (error) {
    console.log(error.message)
  }


};



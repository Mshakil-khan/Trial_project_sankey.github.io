import axios from "axios";
import { logoutUser } from "./authAction";
export const SUBMIT_TEST_REQUEST = "SUBMIT_TEST_REQUEST";
export const SUBMIT_TEST_SUCCESS = "SUBMIT_TEST_SUCCESS";
export const SUBMIT_TEST_FAILURE = "SUBMIT_TEST_FAILURE";

export const ASSIGNED_TEST_REQUEST = "ASSIGNED_TEST_REQUEST";
export const ASSIGNED_TEST_SUCCESS = "ASSIGNED_TEST_SUCCESS";
export const ASSIGNED_TEST_FAILURE = "ASSIGNED_TEST_FAILURE";

export const SET_TEST_CREATED_FALSE = "SET_TEST_CREATED_FALSE";
const url = "http://localhost:5000"

const requestSubmitTest = () => {
    return {
        type: SUBMIT_TEST_REQUEST,
    };
};

const receiveSubmitTest = (user, profileID) => {
    return {
        type: SUBMIT_TEST_SUCCESS,
    };
};

const submitTestError = () => {
    return {
        type: SUBMIT_TEST_FAILURE,
    };
};



const setTestCreatedFalse = () => {
    return {
        type: SET_TEST_CREATED_FALSE,
    };
};

export const submitTest = (values) => async (dispatch) => {
    console.log(values);

    dispatch(requestSubmitTest());
    try {
        const result = await axios.post(`${url}/teacher/create-test`, values);
        if (result.data?.error?.name === "TokenExpiredError") {
            dispatch(logoutUser());
        } else {
            dispatch(receiveSubmitTest(result.data.user));
        }

    } catch (error) {
        console.log(error);
        dispatch(submitTestError());
    }

};



export const testCreatedFalse = () => async (dispatch) => {
    dispatch(setTestCreatedFalse());
};

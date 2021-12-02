import axios from 'axios';


export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const USER_ACCOUNT_CREATED = "USER_ACCOUNT_CREATED";


const userAccountCreated = () => {
    return {
        type: USER_ACCOUNT_CREATED,
    };
};


const requestsignup = () => {
    return {
        type: SIGN_UP_REQUEST,
    };
};

const receiveSignup = (user) => {
    return {
        type: SIGN_UP_SUCCESS,
        user,
    };
};

const signupError = (errMess) => {
    return {
        type: SIGN_UP_FAILURE,
        errMess,
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};


const requestLogin = () => {
    return {
        type: LOGIN_REQUEST,
    };
};

const receiveLogin = (user, profileID) => {
    return {
        type: LOGIN_SUCCESS,
        user,
        profileID,
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE,
    };
};





const url = "http://localhost:5000"

export const signUpUser = (values) => (dispatch) => {
    //  debugger;
    try {
        dispatch(requestsignup());

        const res = axios.post(`${url}/user/signup`, values);
        console.log(res);

        if (res.data.token) {
            dispatch(receiveSignup(res.data.user));
        }

    } catch (error) {
        console.log(error)
        dispatch(signupError());
    }

};


export const accountCreated = () => (dispatch) => {
    dispatch(userAccountCreated());
};


export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    dispatch(receiveLogout());
};


export const loginUser = (values) => async (dispatch) => {
    dispatch(requestLogin());

    try {
        const result = await axios.post(`${url}/user/login`, values);

        if (result.data.token) {
            localStorage.setItem("token", `Bearer ${result.data.token}`);
            localStorage.setItem("userProfile", JSON.stringify(result.data.payload.user));
            localStorage.setItem("profileID", result.data.payload.profileid);
            dispatch(receiveLogin(result.data.payload.user, result.data.payload.profileid));
        }

    } catch (error) {
        dispatch(loginError());

    }


};






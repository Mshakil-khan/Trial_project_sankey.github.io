import { combineReducers } from "redux";
import { authReducer } from './authReducer';
import selectReducer from "./selectReducer";
import teacherReducer from "./teacherReducer";
import testReducer from "./testReducer";

export default combineReducers({
    auth: authReducer,
    teacher: teacherReducer,
    tests: testReducer,
    selectedTest: selectReducer,



});

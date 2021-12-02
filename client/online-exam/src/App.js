import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Protectedroute from './protectedRoute/Protectedroute';
import Login from './login/Login';
import Signup from './signup/Signup';
import Navbar from './navbar';
import { Teacher } from './teachercomp/Teacher';
import Student from './studentcomp/Student';
import { connect } from "react-redux";
import { Roles } from './Roles/roles';
import Createtest from './teachercomp/Createtest';
import Profile from './profile/Profile';
import TestInstruction from './TestInstructions/TestInstruction';
import TestList from './studentcomp/TestList';



function App(props) {
  const role = props.userInfo.role
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact={true} path={"/signin"} component={Login} />
          <Route exact={true} path={"/signup"} component={Signup} />
          <Protectedroute exact={true}
            path="/"
            component={Roles.teacher === role ? Teacher : Student}
          />

          <Protectedroute
            exact={true}
            path="/create-test"
            component={Roles.teacher === role ? Createtest : ""}
          />
          <Protectedroute exact={true} path="/profile" component={Profile} />
          <Protectedroute exact={true} path="/test-instructions" component={TestInstruction} />
          <Protectedroute exact={true} path="/attempt-test" component={TestList} />


        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(App);

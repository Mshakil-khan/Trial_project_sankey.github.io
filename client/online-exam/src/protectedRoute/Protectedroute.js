import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Protectedroute = (props) => {

    const Component = props.component;
    return (
        <>{
            props.isAuthenticated ? (
                <Component userInfo={props.userInfo} />
            ) : (
                <Redirect to={{ pathname: "/signin" }} />
            )

        }
        </>

    )

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userInfo: state.auth.user,
    };
};
export default connect(mapStateToProps, null)(Protectedroute);

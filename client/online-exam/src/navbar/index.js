import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LeftMenu from "./LeftMenu";
import "./Navbar.css";



const Navbar = (props) => {

    const [draw, setdraw] = useState(
        false
    )

    const showDrawer = () => {
        setdraw(true);
    };

    const onClose = () => {
        setdraw(false);
    };


    console.log(props.userInfo);

    return (
        <nav className="menuBar">
            <div className="logo" style={{ textAlign: 'center' }}>
                <Link to="/">Online Exam </Link>
            </div>
            <div className="menuCon">
                <div className="leftMenu">
                    <LeftMenu />
                </div>
                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                    title="Menu"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={draw}
                >
                    <LeftMenu role={props} />
                </Drawer>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.auth.user,
    };
};
export default connect(mapStateToProps, null)(Navbar);

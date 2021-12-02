import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Avatar, Popover } from "antd";
import { connect } from "react-redux";
import { Roles } from "../Roles/roles";
import "./Profile.css";


const Profile = (props) => {
    const [state, setstate] = useState({
        firstName: undefined,
        isVerified: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        role: undefined,
        section: undefined,
        isVerified: undefined,
        className: undefined,
    });

    useEffect(() => {
        setstate({
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
            isVerified: props.userisVerified,
            phone: props.user.phone,
            role: props.user.role,
            section: props.user.section,
            isVerified: props.user.isVerified,
            className: props.user.className,
        });
    }, [props.user]);

    const submitForm = (values) => {
        console.log(values);
    };

    const verfied = (
        <div>
            <p className="verified-popover">Verified !</p>
        </div>
    );
    const notVerfied = (
        <div>
            <p className="notverifieid-popover">Not Verified!</p>
        </div>
    );
    return (
        <>
            <Row justify="center" align="middle" className="hero">
                <Col xs={22} sm={22} md={8} lg={8}>
                    <div className="avatar-wrapper">
                        <Avatar
                            size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 90, xxl: 100 }}
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            className="avatar-image"
                        />
                        <Popover content={state.isVerified ? verfied : notVerfied}>
                            <img
                                src={state.isVerified ? "/verified.png" : "/notVerified.png"}
                                alt="verification"
                                className="verified"
                            />
                        </Popover>
                        <p
                            style={{ margin: 0, textAlign: "center" }}
                        >
                            Your Profile
                        </p>
                    </div>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={submitForm}
                    >
                        <div className="element__wrapper">
                            <Form.Item>
                                <Input
                                    placeholder="First Name"
                                    readOnly="readOnly"
                                    value={state.firstName}
                                    className="input"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    placeholder="Last Name"
                                    readOnly="readOnly"
                                    value={state.lastName}
                                    className="input"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Input
                                placeholder="abcd@gmail.com"
                                readOnly="readOnly"
                                value={state.email}
                                className="input"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="tel"
                                placeholder="7275XXXXXX"
                                readOnly="readOnly"
                                value={state.phone}
                                className="input"
                            />
                        </Form.Item>
                        <div className="element__wrapper">
                            <Form.Item>
                                <Input
                                    placeholder="Role"
                                    readOnly="readOnly"
                                    value={state.role}
                                    className="input"
                                />
                            </Form.Item>
                            <Form.Item
                                className={Roles.teacher === state.role ? "hidden" : ""}
                            >
                                <Input
                                    placeholder="Class"
                                    readOnly="readOnly"
                                    value={state.className}
                                    className="input"
                                />
                            </Form.Item>
                            <Form.Item
                                className={Roles.teacher === state.role ? "hidden" : ""}
                            >
                                <Input
                                    placeholder="Section"
                                    readOnly="readOnly"
                                    value={state.section}
                                    className="input"
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {

    return {
        user: state.auth.user ? state.auth.user : null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { loginUser } from "../action/authAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Login = (props) => {
    // debugger
    const history = useHistory();

    useEffect(() => {
        if (props.isAuthenticated) {
            history.push("/");
        }
    }, [props]);

    const submitForm = (values) => {
        props.sendLoginRequest(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <Row justify="center" align="middle" className="hero">
                <Col xs={22} sm={22} md={6} lg={6}>
                    <p className="sub-title"> EMS</p>

                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={submitForm}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <div
                            className="link"
                            style={{
                                textAlign: "center",
                                fontWeight: 500,
                                marginBottom: "15px",
                            }}
                        >
                            <Link to="/signup">New here? Create your account.</Link>
                        </div>
                        <Form.Item>
                            <Button
                                type="primary"
                                style={{ minWidth: "44px" }}
                                htmlType="submit"
                            >
                                Logging In
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        sendLoginRequest: (values) => dispatch(loginUser(values)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

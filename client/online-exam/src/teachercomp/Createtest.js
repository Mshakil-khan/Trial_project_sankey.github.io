import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Select, notification } from "antd";
import { connect } from "react-redux";
import Questions from "./Questions";
import RenderData from "./RenderData";
import { submitTest, testCreatedFalse } from "../action/TeacherActions";

const CreateTest = (props) => {

    const [state, setstate] = useState({
        rules: [],
        questions: [],
        isLoading: false,
        testCreated: false,
    })



    const submitForm = (values) => {

        let questions = [];
        let answers = [];

        const {
            testName,
            category,
            className,
            section,
            minutes,
            outOfMarks,
        } = values;


        questions = state.questions.map((question, index) => {
            console.log(questions)
            return {
                description: question.questionDescripiton,
                options: [
                    {
                        option: question.opiton1,
                    },
                    {
                        option: question.opiton2,
                    },
                    {
                        option: question.opiton3,
                    },
                    {
                        option: question.opiton4,
                    },
                ],
            };
        });
        state.questions.map((question, index) => {
            answers.push(parseInt(question.answer));
        });
        const teacherId = props.teacherID;
        const rules = state.rules;

        const sendData = {
            teacherId,
            testName,
            category,
            className,
            section,
            rules,
            testCreated: false,
            minutes,
            outOfMarks,
            questions,
            answers,
        };

        props.submitTest(sendData);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };



    const handleDeleteQuestion = (Removeindex) => {

        setstate({
            questions: state.questions.filter((item, index) => index !== Removeindex),
        });
    };



    const openNotification = () => {
        const args = {
            message: "Test Created",
            description: "Congratulations, Your Test created successfully.",
            duration: 3,
        };
        notification.open(args);
    };

    const addQuestion = ({

        questionDescripiton,
        opiton1,
        opiton2,
        opiton3,
        opiton4,
        answer,
    }) => {
        setstate({
            questions: [
                ...state.questions,
                { questionDescripiton, opiton1, opiton2, opiton3, opiton4, answer },
            ],
        });
    };


    useEffect(() => {
        if (props.testCreated) {
            props.testCreatedFalse()
            openNotification();
        }

    }, [props.testCreated])



    const { Option } = Select;

    return (
        <>
            <Row justify="center" align="middle">
                <Col xs={22} sm={22} md={10} lg={10} className="signup__container">
                    <p > Create Test</p>
                    <Form
                        name="basic"
                        className="create__test__form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={submitForm}
                        onFinishFailed={onFinishFailed}
                    >
                        <div className="element__wrapper">
                            <Form.Item
                                name="testName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Test Name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Test Name" className="input" />
                            </Form.Item>
                            <Form.Item
                                name="outOfMarks"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter total marks!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Total Marks"
                                    className="input"
                                    type="number"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a category",
                                },
                            ]}
                        >
                            <Input placeholder="Catergory of Test" className="input" />
                        </Form.Item>
                        <Form.Item
                            name="minutes"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter total duration of test",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Duration of test ( in Minutes )"
                                className="input"
                                type="number"
                            />
                        </Form.Item>

                        <div >
                            <Form.Item
                                name="section"
                                rules={[
                                    { required: true, message: "Please input your section!" },
                                ]}
                            >
                                <Select defaultValue="Section">
                                    <Option value="A">A</Option>
                                    <Option value="B">B</Option>
                                    <Option value="C">C</Option>
                                    <Option value="D">D</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="className"
                                rules={[{ required: true, message: "Please select a class" }]}
                            >
                                <Select defaultValue="Class">
                                    <Option value="IX">IX</Option>

                                </Select>
                            </Form.Item>
                        </div>

                        <p style={{ fontWeight: "500" }}>
                            {" "}
                            Test Questions
                        </p>
                        <RenderData
                            questionData={state.questions}
                            questions={true}
                            clickedRule={handleDeleteQuestion}
                        />
                        <Form.Item>
                            <Questions addQuestion={addQuestion} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                loading={state.isLoading}
                                className="sign__up"
                                htmlType="submit"
                                disabled={(state.questions.length < 1) ? (true) : (false)}
                            >
                                {state.isLoading ? "Creating Test" : "Create Test"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        teacherID: state.auth.profileID,
        isLoading: state.teacher.isLoadingTest,
        testCreated: state.teacher.testCreated,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        submitTest: (values) => dispatch(submitTest(values)),
        testCreatedFalse: () => dispatch(testCreatedFalse()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);

import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import TestCard from "./TestCard";

function Student(props) {
    const { studentClassName } = props;


    return (
        <>
            <div >
                <Row gutter={[48, 10]} justify="center">
                    <Col xs={24} sm={24} md={9} xl={9}>
                        <TestCard
                            studentClassName={studentClassName}
                        />
                    </Col>

                </Row>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        studentClassName: state.auth.user ? state.auth.user.className : null,
    };
};

export default connect(mapStateToProps, null)(Student);

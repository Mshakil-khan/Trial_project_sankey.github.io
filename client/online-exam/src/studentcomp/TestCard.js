import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchTests } from "../action/testActions";
import { connect } from "react-redux";

function TestCard(props) {
    let { tests, isLoading, studentClassName } = props;


    useEffect(() => {
        props.fetchTests(studentClassName);
    }, []);
    return (
        <>
            <div >
                <p >
                    {<HiOutlineClipboardList />}Today's Test
                </p>
            </div>
            <div className="left__body">
                {!isLoading && tests ? (
                    <ul className="left__body__list__ul">
                        {tests.map((test, index) => (
                            <Link to="/attempt-test" key={index}>
                                <li >
                                    <div className="test__index">
                                        <p >{index + 1}</p>
                                    </div>
                                    <div className="test__name "> {test.testName}</div>
                                    <div className="test__icon">
                                        <HiClipboardCopy />
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.tests.isLoadingTest,
        tests: state.tests.test,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTests: (classID) => dispatch(fetchTests(classID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCard);

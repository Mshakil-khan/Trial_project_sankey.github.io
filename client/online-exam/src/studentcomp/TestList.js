import React, { useState, useEffect } from "react";
import { Button } from "antd";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./SelectTest.css";
import { selectedTest } from "../action/selectActions";

function TestList(props) {
  const history = useHistory();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    setTests(props.tests.reverse());
  }, [props]);



  let selectRef,
    selectedData = {};

  const handleButtonClick = () => {
    props.selectedTest(selectedData);
    history.push("/test-instructions");
  };

  const handleSelectTest = (e, index) => {
    if (selectRef) {
      selectRef.classList.remove("selected__test");
    }
    selectRef = e.currentTarget;
    e.currentTarget.classList.add("selected__test");
    selectedData = tests[index];

    //console.log();
  };

  return (
    <>
      <div className="select__test__wrapper">
        <p className="test__wrapper__heading">Available Test</p>

        <p className="test__wrapper__heading select__heading">
          Select Test
        </p>
        <div className="select__test__body">

          {
            tests.map((test, index) => (
              <div
                key={index}
                className={`test__wrapper`}
                onClick={(e) => {
                  handleSelectTest(e, index);
                }}
              >
                <p className="select__test" key={index}>
                  {test.testName}
                </p>

              </div>
            ))


          }

        </div>
        <div className="select__button">
          <Button type="primary" onClick={handleButtonClick}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}



const mapStateToProps = (state) => {
  return {
    tests: state.tests.test,
    profileID: state.auth.profileID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectedTest: (testData) => dispatch(selectedTest(testData)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestList);

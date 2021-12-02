import React, { useState } from 'react'
import { connect } from "react-redux";

const TestInstruction = ({ selectedTest }) => {
  console.log(selectedTest.questions)
  const [state, setState] = useState({
    answers: selectedTest.answers,
    quetions: selectedTest.questions,
    testName: selectedTest.testName,
    activateQue: 0
  })
  return (
    <div>


      see in console

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state.selectedTest.selectedTestData)
  return {
    selectedTest: state.selectedTest.selectedTestData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestInstruction);
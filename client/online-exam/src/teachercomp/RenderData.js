import React from "react";
import { Input } from "antd";
import { TiDelete } from "react-icons/ti";

export default function RenderData(props) {
  const { questionData, rules } = props;
  console.log(props)
  const handleClick = (index) => {
    props.clickedRule(index);
  };
  return (
    <div className="renderData__wrapper">
      {rules
        ? " "
        : questionData &&
        questionData.map((item, index) => (
          <div key={index}>
            <p >Question {index + 1}</p>
            <div >
              <Input.TextArea
                readOnly="readOnly"

                value={item.questionDescripiton}
                className="input"
                style={{ margin: "0 5px" }}
              />
              <TiDelete
                className="danger"
                onClick={() => handleClick(index)}
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="question__options">
              <Input

                value={item.opiton1}
                readOnly="readOnly"
                style={{ margin: "10 5px" }}
              />
              <Input

                value={item.opiton2}
                readOnly="readOnly"
                style={{ margin: "10 5px" }}
              />
              <Input

                value={item.opiton3}
                readOnly="readOnly"
                style={{ margin: "10 5px" }}
              />
              <Input

                value={item.opiton4}
                readOnly="readOnly"
                style={{ margin: "10 5px" }}
              />
              <Input
                type="number"

                value={item.answer}
                readOnly="readOnly"
                style={{ margin: "10 5px" }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
